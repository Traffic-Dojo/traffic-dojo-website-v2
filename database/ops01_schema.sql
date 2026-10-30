-- Reviewed deployment SQL for the existing Website project. No historical backfill.
-- Root applies via the migration tool after review; this file is not executed by builds.
BEGIN;

CREATE TABLE public.dojo_crm_state (
  client_id uuid PRIMARY KEY REFERENCES public.clients(id) ON DELETE RESTRICT,
  stage text NOT NULL DEFAULT 'new' CHECK (stage IN ('new','contacted','qualified','proposal','agreed','closed')),
  flow text NOT NULL DEFAULT 'inbound' CHECK (flow IN ('inbound','outbound','partner')),
  owner text NOT NULL DEFAULT 'Maksim',
  source text NOT NULL DEFAULT 'website',
  next_action_at timestamptz,
  next_action text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  agreed_amount numeric(12,2) CHECK (agreed_amount >= 0),
  payment_received_amount numeric(12,2) NOT NULL DEFAULT 0 CHECK (payment_received_amount >= 0),
  payment_received_at timestamptz,
  request_hash text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (payment_received_amount = 0 OR payment_received_at IS NOT NULL),
  CHECK (length(notes) <= 20000 AND length(next_action) <= 2000 AND length(owner) <= 200)
);
CREATE TABLE public.dojo_lead_notifications (
  client_id uuid PRIMARY KEY REFERENCES public.clients(id) ON DELETE RESTRICT,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','dispatching','accepted','needs_review')),
  attempts integer NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  lease_token uuid,
  leased_until timestamptz,
  provider_id text,
  accepted_at timestamptz,
  last_error_code text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (last_error_code IS NULL OR length(last_error_code) <= 100)
);
ALTER TABLE public.dojo_crm_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dojo_lead_notifications ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.dojo_crm_state, public.dojo_lead_notifications FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.dojo_crm_state, public.dojo_lead_notifications TO service_role;
CREATE POLICY dojo_crm_server_only ON public.dojo_crm_state TO service_role USING (true) WITH CHECK (true);
CREATE POLICY dojo_notification_server_only ON public.dojo_lead_notifications TO service_role USING (true) WITH CHECK (true);
CREATE INDEX dojo_crm_next_action ON public.dojo_crm_state(next_action_at) WHERE stage <> 'closed';
CREATE INDEX dojo_notification_pending ON public.dojo_lead_notifications(next_attempt_at) WHERE status='pending';

CREATE FUNCTION public.dojo_client_payload(c public.clients)
RETURNS jsonb LANGUAGE sql IMMUTABLE SECURITY INVOKER SET search_path = '' AS $$
  SELECT jsonb_strip_nulls(jsonb_build_object(
    'name',c.name,'email',c.email,'business',c.business,'phone',c.phone,
    'website',c.website,'comment',c.comment,'situation',c.situation,
    'market',c.market,'needs',c.needs,'budget',c.budget
  ));
$$;

CREATE FUNCTION public.dojo_after_client_insert()
RETURNS trigger LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
BEGIN
  INSERT INTO public.dojo_crm_state(client_id,request_hash)
  VALUES(NEW.id,encode(sha256(convert_to(public.dojo_client_payload(NEW)::text,'UTF8')),'hex'));
  INSERT INTO public.dojo_lead_notifications(client_id) VALUES(NEW.id);
  RETURN NEW;
END; $$;
-- Only FUTURE INSERTs enter the active pipeline or notification queue.
CREATE TRIGGER dojo_capture_new_client AFTER INSERT ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.dojo_after_client_insert();

CREATE FUNCTION public.dojo_submit_inquiry(p_id uuid, p_payload jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE c public.clients; incoming_hash text; saved_hash text;
BEGIN
  IF p_id IS NULL OR jsonb_typeof(p_payload) IS DISTINCT FROM 'object' THEN
    RAISE EXCEPTION 'invalid_inquiry';
  END IF;
  c := jsonb_populate_record(NULL::public.clients,p_payload);
  incoming_hash := encode(sha256(convert_to(public.dojo_client_payload(c)::text,'UTF8')),'hex');
  INSERT INTO public.clients(id,situation,market,needs,budget,name,email,business,website,phone,comment)
  VALUES(p_id,c.situation,c.market,c.needs,c.budget,c.name,c.email,c.business,c.website,c.phone,c.comment)
  ON CONFLICT(id) DO NOTHING;
  SELECT request_hash INTO saved_hash FROM public.dojo_crm_state WHERE client_id=p_id;
  -- Historic ID collisions are conflicts; they never promote historic records.
  RETURN jsonb_build_object('id',p_id,'conflict',saved_hash IS DISTINCT FROM incoming_hash);
END; $$;

CREATE FUNCTION public.dojo_claim_inquiry_notification(p_id uuid DEFAULT NULL)
RETURNS TABLE(id uuid,payload jsonb,lease_token uuid)
LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
BEGIN
  -- Gmail cannot deduplicate sends: an expired dispatch may already have sent mail.
  UPDATE public.dojo_lead_notifications q
  SET status='needs_review',last_error_code='dispatch_outcome_unknown',
      lease_token=NULL,leased_until=NULL,updated_at=now()
  WHERE q.status='dispatching' AND q.leased_until<=now()
    AND (p_id IS NULL OR q.client_id=p_id);
  RETURN QUERY
  WITH candidate AS (
    SELECT q.client_id FROM public.dojo_lead_notifications q
    WHERE q.status='pending' AND q.attempts<5 AND q.next_attempt_at<=now()
      AND (p_id IS NULL OR q.client_id=p_id)
    ORDER BY q.next_attempt_at,q.client_id FOR UPDATE SKIP LOCKED LIMIT 1
  ), claimed AS (
    UPDATE public.dojo_lead_notifications q
    SET status='dispatching',lease_token=gen_random_uuid(),leased_until=now()+interval '90 seconds',
        attempts=q.attempts+1,updated_at=now()
    FROM candidate c WHERE q.client_id=c.client_id
    RETURNING q.client_id,q.lease_token
  )
  SELECT q.client_id,public.dojo_client_payload(c),q.lease_token
  FROM claimed q JOIN public.clients c ON c.id=q.client_id;
END; $$;

CREATE FUNCTION public.dojo_finish_inquiry_notification(
  p_id uuid,p_lease uuid,p_outcome text,p_provider_id text DEFAULT NULL,p_error_code text DEFAULT NULL)
RETURNS boolean LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE count_updated integer;
BEGIN
  IF p_outcome IS NULL OR p_outcome NOT IN ('accepted','retryable','needs_review','blocked','invalid') OR
    (p_outcome='accepted' AND coalesce(p_provider_id,'')='') THEN
    RAISE EXCEPTION 'invalid_notification_outcome';
  END IF;
  UPDATE public.dojo_lead_notifications q
  SET status=CASE WHEN p_outcome='accepted' THEN 'accepted'
        WHEN p_outcome='retryable' AND q.attempts<5 THEN 'pending' ELSE 'needs_review' END,
      provider_id=CASE WHEN p_outcome='accepted' THEN p_provider_id ELSE q.provider_id END,
      accepted_at=CASE WHEN p_outcome='accepted' THEN now() ELSE q.accepted_at END,
      next_attempt_at=now()+interval '15 minutes',last_error_code=p_error_code,
      lease_token=NULL,leased_until=NULL,updated_at=now()
  WHERE q.client_id=p_id AND q.status='dispatching' AND q.lease_token=p_lease;
  GET DIAGNOSTICS count_updated = ROW_COUNT;
  RETURN count_updated=1;
END; $$;

REVOKE ALL ON FUNCTION public.dojo_client_payload(public.clients) FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.dojo_after_client_insert() FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.dojo_submit_inquiry(uuid,jsonb) FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.dojo_claim_inquiry_notification(uuid) FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.dojo_finish_inquiry_notification(uuid,uuid,text,text,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.dojo_client_payload(public.clients) TO service_role;
GRANT EXECUTE ON FUNCTION public.dojo_after_client_insert() TO service_role;
GRANT EXECUTE ON FUNCTION public.dojo_submit_inquiry(uuid,jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.dojo_claim_inquiry_notification(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.dojo_finish_inquiry_notification(uuid,uuid,text,text,text) TO service_role;
COMMIT;
