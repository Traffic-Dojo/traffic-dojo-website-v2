import { ProposalSchema } from '../../schemas/proposal.ts';
import { z } from 'zod';
import { createWorkspaceMailer } from './workspace-mailer.mjs';

export const InquiryRequestSchema = ProposalSchema.extend({
  requestId: z.string().uuid(),
  companyFax: z.string().max(0).optional(),
});
export class IntakeError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

export async function submitInquiry(raw, { store, notify }) {
  const parsed = InquiryRequestSchema.safeParse(raw);
  if (!parsed.success) throw new IntakeError(422, 'Please check your contact details and try again.');
  const { requestId, companyFax, ...payload } = parsed.data;
  let result;
  try { result = await store.save(requestId, payload); }
  catch { throw new IntakeError(503, 'Your inquiry could not be saved. Please try again.'); }
  if (result.conflict) throw new IntakeError(409, 'Please refresh the form before submitting changed details.');
  // Notification failures cannot undo persistence or make the client resubmit a saved inquiry.
  try { await notify(requestId); } catch { /* pending state remains durable */ }
  return { saved: true, receiptId: result.id };
}

export function createInquiryStore(db) {
  return {
    async save(id, payload) {
      const { data, error } = await db.rpc('dojo_submit_inquiry', { p_id: id, p_payload: payload });
      if (error || !data || !data.id) throw new Error('save_failed');
      return data;
    },
    async claim(id = null) {
      const { data, error } = await db.rpc('dojo_claim_inquiry_notification', { p_id: id });
      if (error) throw new Error('claim_failed');
      return data?.[0] ?? null;
    },
    async finish(id, lease, outcome) {
      const { data, error } = await db.rpc('dojo_finish_inquiry_notification', {
        p_id: id, p_lease: lease, p_outcome: outcome.status,
        p_provider_id: outcome.providerId ?? null, p_error_code: outcome.reason ?? null,
      });
      if (error || data !== true) throw new Error('completion_failed');
    },
  };
}

export function workspaceMailConfig(env = process.env) {
  return { clientId: env.GOOGLE_MAIL_CLIENT_ID, clientSecret: env.GOOGLE_MAIL_CLIENT_SECRET,
    refreshToken: env.GOOGLE_MAIL_REFRESH_TOKEN, sender: env.GOOGLE_MAIL_SENDER };
}
export function workspaceMailConfigured(config) {
  return ['clientId', 'clientSecret', 'refreshToken', 'sender'].every(key =>
    typeof config?.[key] === 'string' && config[key].trim()) &&
    /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@traffic-dojo\.com$/i.test(config.sender);
}

export function createOwnerNotifier({ store, mailConfig, sendMail = createWorkspaceMailer(mailConfig) }) {
  return async function notifyOne(id = null) {
    // Leave jobs pending until send-only Workspace credentials have been configured.
    if (!workspaceMailConfigured(mailConfig)) return { status: 'not_configured' };
    const job = await store.claim(id);
    if (!job) return { status: 'nothing_pending' };
    let outcome;
    try { outcome = await sendMail(job); }
    catch { outcome = { status: 'needs_review', reason: 'send_outcome_unknown' }; }
    if (!['accepted', 'retryable', 'needs_review', 'blocked', 'invalid'].includes(outcome?.status)) {
      outcome = { status: 'needs_review', reason: 'send_outcome_unknown' };
    }
    try { await store.finish(job.id, job.lease_token, outcome); }
    catch {
      // Mail may already have been accepted. Do not release this job for another send.
      // The expired lease becomes needs_review in the database before future claims.
      return { status: 'needs_review', receiptId: job.id };
    }
    return { status: outcome.status, receiptId: job.id };
  };
}
