# Traffic Dojo intake and database operations

## Release status — 30 October 2026

The additive schema migration has already been applied to the main Website Supabase project `tyzxhgzazqexecwxjntq` by the coordinator. The corrected transactional rollback validation passed. Do not rerun the creation migration on this database. The SQL remains in this repository as the migration record and for review / separately prepared environments.

This isolated release branch contains the reviewed application changes. A local commit is being prepared for review; publication to GitHub and deployment remain pending. Real Workspace OAuth authorization, notification inbox delivery and production cron invocation still require the coordinator's deployment checks. Existing local validation remains 30 passing mocked tests plus successful normal and Vercel-preset builds with emitted maxDuration 180; unchanged application code was not rebuilt in this checkout.

Prepared 30 October 2026 against verified source commit `6ae04e8`. Apply the patch to the current Vercel source after checking intervening changes; do not replace a newer deployment with this snapshot. California positioning, original assets and the existing wizard remain. Phone and budget remain required because the live enum/required-field schema cannot represent “not supplied” honestly. The direct email CTA provides an alternative.

## Behavior

The website displays form errors, preserves entries, prevents repeated clicks during submission, normalizes empty/bare website URLs, retains the comment and displays a persisted receipt. Identical retries in the same open form keep their UUID; changed data or a reload can create a new inquiry. Success means saved, not email delivered. Analytics fires after save without contact details. Subscription errors are visible and duplicate emails are idempotent.

`public.clients` remains the sole contact record. The audited 196 historical form records are not active customers. All existing clients and 265 subscriptions remain unchanged. No event project is touched. Two private, service-role-only tables add manual CRM state and owner-notification status. Historical clients have no CRM state until deliberately reviewed/promoted; the CRM labels them `unreviewed_history`. There is no historical backfill or notification replay.

An AFTER INSERT trigger creates state and a pending notification for future clients only, including inserts made by the old server. The new atomic submission RPC whitelists existing typed fields, uses the request UUID as clients.id, and hashes canonical contact data with PostgreSQL's built-in SHA256. Reusing the same UUID with changed details returns a conflict. No extension or duplicate contact store is needed.

Workspace sends owner notifications only to `maksim@traffic-dojo.com`; visitor email is a validated Reply-To. No automatic visitor reply is sent. Gmail acceptance is separate from inbox delivery. Credentials and service keys stay server-side. Gmail has no documented send idempotency guarantee: ambiguous timeout/5xx, missing Gmail receipt or expired dispatch lease become `needs_review`. Only clearly rejected/pre-send failures can retry automatically. Never reset a needs_review job before checking Gmail manually by inquiry reference / deterministic Message-ID.

## Deployment order

1. Confirm current source branch, Vercel target and Supabase project `tyzxhgzazqexecwxjntq` (Traffic Dojo Website). Preserve current hosting settings/source changes. Confirm no duplicate owner-notification integration was added after the audit.
2. Review and apply `database/ops01_schema.sql` once as an additive Supabase migration. It intentionally fails on object-name conflicts; do not resolve conflicts by dropping data. It creates no history rows and changes no existing client/subscription values, enums or grants. Requires PostgreSQL 14+ built-in SHA256 and standard Supabase roles. Supabase CLI is absent here, so this is reviewed deployment SQL, not a fabricated CLI migration filename.
3. Run `database/ops01_verify_rollback.sql` through the authorised database connection. It inserts three synthetic contacts, tests hash idempotency/conflicts, future-only capture, accepted replay protection, backoff, expired-lease review and unchanged existing contact content. It rolls everything back and performs no mail/network call.
4. Preserve `SUPABASE_URL` / server `SUPABASE_SECRET_KEY` in Vercel. Add `GOOGLE_MAIL_CLIENT_ID`, `GOOGLE_MAIL_CLIENT_SECRET`, `GOOGLE_MAIL_REFRESH_TOKEN`, `GOOGLE_MAIL_SENDER` and independent random `LEAD_RETRY_SECRET` / `CRON_SECRET` (at least 16 characters). See companion Workspace mailer README for OAuth setup. Use Gmail send scope only; secrets must never appear in browser code, source, chat or screenshots.
5. With mail unconfigured, form persistence still works and notification jobs stay pending without being claimed. Add credentials only when ready to activate notifications. Configured but revoked credentials require operator attention. The included `vercel.json` defines one daily production cron; it becomes active only when this configuration is deployed. Nothing is scheduled by local tests.
6. Deploy only the reviewed current website branch through the existing Vercel flow after authorization/testing. A trusted operator may POST `/api/internal/lead-notifications` with bearer secret through a protected client. Never put literal secrets in command history. It processes at most five due jobs. No unauthorised caller receives contact data. The protected GET route uses `CRON_SECRET` for Vercel Cron; the manual POST uses the separate `LEAD_RETRY_SECRET`. Both return only statuses and forbid caching.
7. Submit one labelled synthetic inquiry with an address you control. Verify receipt, clients row, CRM state, one Gmail-accepted notification and actual inbox arrival. Verify unauthorised retry endpoint returns 401, missing mail config leaves pending, no visitor auto-email, and same-ID retry creates no second contact. Real OAuth/inbox and production form tests require authorized activation.
8. Configure hosting request/rate limits appropriate to public forms. The endpoint rejects bodies over 16 KiB after reading; it is not a distributed rate limiter. Honeypot validation alone does not stop abuse.

## Daily control

Owner updates next action/date, stage, agreed amount and recorded payment in the local CRM. CRM state is separate from client data; agreement does not imply payment. Historical promotions are explicit and must not queue old notifications. Email/link clicks are not automatically persisted leads. Newsletter remains separate.

Review old pending jobs, expired dispatching leases, all needs_review jobs and pending rows at five attempts. A dispatch can have sent mail even if final acknowledgement failed. Search Gmail manually for `Message-ID: <website-inquiry-UUID@traffic-dojo.com>`; this is a reconciliation aid, not delivery proof or deduplication. Retry backoff is 15 minutes, capped at five claims. Bad credentials or blocked/invalid outcomes stop in needs_review. There is no automated inbox read.

Counts-only queries (no contact details):

```sql
select count(*) as clients_form_records from public.clients;
select count(*) as newsletter_records from public.subscriptions;
select count(*) as unreviewed_history from public.clients c
where not exists(select 1 from public.dojo_crm_state s where s.client_id=c.id);
select stage,count(*) from public.dojo_crm_state group by stage;
select status,count(*) from public.dojo_lead_notifications group by status;
select count(*) as overdue_notification_attention from public.dojo_lead_notifications
where status='needs_review'
   or (status='pending' and (attempts>=5 or next_attempt_at<now()-interval '1 hour'))
   or (status='dispatching' and leased_until<=now());
```

## Rollback and validation limits

Stop retry callers / disable the Vercel cron before reverting the application patch. Keep additive tables/functions and future-insert trigger: the old server still inserts valid clients and the queue preserves inquiries without sending on its own. Preserve unresolved jobs; do not drop/reset tables, discard contacts or pause other projects. If capture must intentionally stop, an administrator can disable only `dojo_capture_new_client` on clients after stopping callers; record the exact interval for later manual review. Never blindly re-enqueue historical clients. Restoring the former application does not remove captured inquiries.

30 tests use mocked database/mail transports; no email is sent. Nuxt build uses dummy environment values. SQL rollback validation, production migration, real OAuth, inbox delivery and deployed form are separate checks not claimed by local tests. Source repository remains untouched.

References: [PostgreSQL binary functions](https://www.postgresql.org/docs/15/functions-binarystring.html), [Gmail messages.send](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/send), [Gmail scopes](https://developers.google.com/workspace/gmail/api/auth/scopes), [Gmail errors](https://developers.google.com/workspace/gmail/api/guides/handle-errors).

## Daily fallback schedule

`vercel.json` invokes GET `/api/internal/lead-notifications` at `0 16 * * *`: 16:00 UTC every day, approximately 9am during California daylight saving time and 8am during standard time. The UTC schedule does not adjust for DST. Vercel supplies the bearer `CRON_SECRET`; missing/wrong secret returns 401 before claims/sending. The manual POST remains separately protected. A website submission still attempts its own notification immediately; cron is a fallback.

Each run handles at most five ready jobs. The batch stops on retryable provider failure, blocked authorization, ambiguous outcome or an empty queue. Unconfigured mail returns 503 without claiming; configured revoked authorization flags one affected job for review and stops. A backlog larger than five jobs may take several daily runs or a manual run. Backoff is at least 15 minutes, but the daily fallback may wait until the next day; it is not a 15-minute response guarantee. On Hobby, daily runs can arrive within the scheduled hour, and missed failures are not automatically retried by Vercel. Repeated invocations are possible; database leases and accepted-state guards remain essential.

Activate only with the reviewed production deployment, `CRON_SECRET` and intended Workspace credentials. Confirm cron appears in Vercel Settings and run a controlled end-to-end check. Runtime requests use function allowances; no new paid resource is introduced here. To stop it, disable the project's cron or remove this cron entry and redeploy; keep pending records for later review. Vercel's Disable Cron Jobs setting persists across rollbacks.

Official references: [Cron GET and UTC behavior](https://vercel.com/docs/cron-jobs), [Cron security, duplicate delivery and failed runs](https://vercel.com/docs/cron-jobs/manage-cron-jobs), [Daily Hobby schedule](https://vercel.com/docs/cron-jobs/usage-and-pricing).

## Vercel execution duration

The live project was observed by the coordinator with Fluid Compute disabled and a 15-second default. `nuxt.config.ts` now sets `nitro.vercel.functions.maxDuration` to 180 seconds, a setting supported by the pinned Nitro 2.13.4 Vercel preset. This applies to Nuxt's shared server function, not an invented per-route function filename. Five sequential jobs could wait up to 100 seconds for two 10-second Google requests each, plus database round trips; normal token caching reduces this. The 180-second ceiling is bounded and leaves margin. No cloud setting or paid resource was changed. A killed/ambiguous dispatch still requires manual reconciliation rather than automatic resend. Verify the generated Vercel function configuration and deployed duration before activation.

References: [Nitro Vercel function options](https://nitro.build/deploy/providers/vercel), [Nuxt server function model](https://vercel.com/docs/frameworks/full-stack/nuxt), [Vercel execution duration](https://vercel.com/docs/functions/configuring-functions/duration).
