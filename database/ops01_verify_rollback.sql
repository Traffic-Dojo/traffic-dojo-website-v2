-- Run after the schema migration in the Website project only.
-- Database-only tests: never call Gmail. Every synthetic row is rolled back.
BEGIN;
DO $$
DECLARE
  first_id uuid := 'cf3b1346-977e-4e25-b5f7-39f6b4b75c01';
  second_id uuid := 'cf3b1346-977e-4e25-b5f7-39f6b4b75c02';
  legacy_id uuid := 'cf3b1346-977e-4e25-b5f7-39f6b4b75c03';
  p jsonb := '{"name":"OPS01 synthetic test","email":"ops01@example.invalid","business":"Synthetic only","phone":"+12025550123","situation":"working","market":"business","needs":["leads"],"budget":"1000","comment":"Database rollback test"}';
  result jsonb; job record; count_before bigint; subscriptions_before bigint;
  history_before text; history_after text;
BEGIN
  IF EXISTS(SELECT 1 FROM public.clients WHERE id IN(first_id,second_id,legacy_id)) THEN
    RAISE EXCEPTION 'test_fixture_collision';
  END IF;
  SELECT count(*),md5(coalesce(string_agg(to_jsonb(c)::text,'' ORDER BY id),''))
    INTO count_before,history_before FROM public.clients c;
  SELECT count(*) INTO subscriptions_before FROM public.subscriptions;
  IF has_table_privilege('anon','public.dojo_crm_state','SELECT') OR
     has_table_privilege('authenticated','public.dojo_lead_notifications','SELECT') OR
     has_function_privilege('anon','public.dojo_submit_inquiry(uuid,jsonb)','EXECUTE') THEN
    RAISE EXCEPTION 'unexpected_public_privilege';
  END IF;
  result := public.dojo_submit_inquiry(first_id,p);
  IF (result->>'conflict')::boolean THEN RAISE EXCEPTION 'first_save_conflicted'; END IF;
  IF NOT EXISTS(SELECT 1 FROM public.dojo_crm_state WHERE client_id=first_id AND stage='new' AND flow='inbound') OR
     NOT EXISTS(SELECT 1 FROM public.dojo_lead_notifications WHERE client_id=first_id AND status='pending') THEN
    RAISE EXCEPTION 'missing_atomic_state';
  END IF;
  result := public.dojo_submit_inquiry(first_id,p);
  IF (result->>'conflict')::boolean THEN RAISE EXCEPTION 'idempotency_failed'; END IF;
  result := public.dojo_submit_inquiry(first_id,p||'{"name":"Changed synthetic test"}'::jsonb);
  IF NOT (result->>'conflict')::boolean THEN RAISE EXCEPTION 'conflict_not_detected'; END IF;
  SELECT * INTO job FROM public.dojo_claim_inquiry_notification(first_id);
  IF job.id IS NULL OR NOT public.dojo_finish_inquiry_notification(first_id,job.lease_token,'retryable',NULL,'token_temporarily_unavailable') THEN
    RAISE EXCEPTION 'retry_transition_failed';
  END IF;
  IF EXISTS(SELECT 1 FROM public.dojo_claim_inquiry_notification(first_id)) THEN RAISE EXCEPTION 'retry_backoff_missing'; END IF;
  UPDATE public.dojo_lead_notifications SET next_attempt_at=now()-interval '1 second' WHERE client_id=first_id;
  SELECT * INTO job FROM public.dojo_claim_inquiry_notification(first_id);
  IF NOT public.dojo_finish_inquiry_notification(first_id,job.lease_token,'accepted','synthetic-gmail-id',NULL) THEN
    RAISE EXCEPTION 'accept_transition_failed';
  END IF;
  IF public.dojo_finish_inquiry_notification(first_id,job.lease_token,'accepted','duplicate',NULL) OR
     EXISTS(SELECT 1 FROM public.dojo_claim_inquiry_notification(first_id)) THEN RAISE EXCEPTION 'accepted_replayed'; END IF;
  PERFORM public.dojo_submit_inquiry(second_id,p);
  SELECT * INTO job FROM public.dojo_claim_inquiry_notification(second_id);
  UPDATE public.dojo_lead_notifications SET leased_until=now()-interval '1 second' WHERE client_id=second_id;
  -- Mutating claim and state assertion must use separate SQL commands/snapshots.
  SELECT * INTO job FROM public.dojo_claim_inquiry_notification(second_id);
  IF job.id IS NOT NULL THEN RAISE EXCEPTION 'expired_send_replayed'; END IF;
  IF NOT EXISTS(SELECT 1 FROM public.dojo_lead_notifications WHERE client_id=second_id AND status='needs_review') THEN
    RAISE EXCEPTION 'expiry_not_flagged';
  END IF;
  -- Compatibility: the old server's direct INSERT also enters the future-only queue.
  INSERT INTO public.clients(id,name,email,business,phone,situation,market,needs,budget)
  VALUES(legacy_id,'OPS01 legacy insert','ops01@example.invalid','Synthetic only','+12025550123','working','business',ARRAY['leads']::public.needs[],'1000');
  IF NOT EXISTS(SELECT 1 FROM public.dojo_lead_notifications WHERE client_id=legacy_id AND status='pending') THEN
    RAISE EXCEPTION 'legacy_insert_not_captured';
  END IF;
  SELECT md5(coalesce(string_agg(to_jsonb(c)::text,'' ORDER BY id),'')) INTO history_after
    FROM public.clients c WHERE id NOT IN(first_id,second_id,legacy_id);
  IF history_before<>history_after OR (SELECT count(*) FROM public.clients)<>count_before+3 OR
     (SELECT count(*) FROM public.subscriptions)<>subscriptions_before THEN
    RAISE EXCEPTION 'existing_records_changed';
  END IF;
END $$;
ROLLBACK;
-- Successful execution has no persistent test data and sends no email.
