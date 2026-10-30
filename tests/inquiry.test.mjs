import test from 'node:test';
import assert from 'node:assert/strict';
import { BusinessInformationSchema } from '../schemas/proposal.ts';
import { submitInquiry, createOwnerNotifier, createInquiryStore, IntakeError } from '../server/services/inquiry.mjs';

const input = {
  requestId: 'f24766dc-f0b3-4b2b-ae84-482774461b56',
  name: 'Test Owner', email: 'owner@example.test', business: 'Example Test',
  phone: '+12025550123', website: '', comment: 'Please discuss lead quality.',
  situation: 'working', market: 'business', needs: ['leads'], budget: '1000',
};
function memoryStore() {
  const rows = new Map();
  return {
    rows,
    async save(id, payload) {
      if (rows.has(id)) return { id, conflict: JSON.stringify(rows.get(id).payload) !== JSON.stringify(payload) };
      rows.set(id, { id, payload, state: 'pending', attempts: 0, leased: false });
      return { id, conflict: false };
    },
    async claim(id) {
      const row = id ? rows.get(id) : [...rows.values()].find(r => r.state === 'pending');
      if (!row || row.state !== 'pending' || row.leased) return null;
      row.leased = true; row.attempts++;
      return { ...row, lease_token: 'test-lease' };
    },
    async finish(id, lease, outcome) {
      Object.assign(rows.get(id), { state: outcome.status === 'retryable' ? 'pending' : outcome.status,
        providerId: outcome.providerId, leased: false });
    },
  };
}
const inert = async () => {};
test('empty optional website is valid and message survives validation', () => {
  const parsed = BusinessInformationSchema.parse(input);
  assert.equal(parsed.website, undefined);
  assert.equal(parsed.comment, input.comment);
});
test('bare domain normalizes once; supported full URL is preserved', () => {
  assert.equal(BusinessInformationSchema.parse({ ...input, website: ' example.com/path ' }).website, 'https://example.com/path');
  assert.equal(BusinessInformationSchema.parse({ ...input, website: 'http://example.com' }).website, 'http://example.com');
});
test('non-web schemes, malformed URL and oversized commentary are rejected', () => {
  for (const website of ['javascript:alert(1)', 'ftp://example.com', 'bad domain']) {
    assert.equal(BusinessInformationSchema.safeParse({ ...input, website }).success, false);
  }
  assert.equal(BusinessInformationSchema.safeParse({ ...input, comment: 'x'.repeat(4001) }).success, false);
});
test('invalid request never reaches persistence or notification', async () => {
  let called = false;
  await assert.rejects(submitInquiry({ ...input, email: 'invalid' }, {
    store: { save: async () => { called = true; } }, notify: async () => { called = true; },
  }), error => error instanceof IntakeError && error.status === 422);
  assert.equal(called, false);
});
test('honeypot input is rejected before persistence', async () => {
  await assert.rejects(submitInquiry({ ...input, companyFax: 'spam' }, { store: memoryStore(), notify: inert }), e => e.status === 422);
});
test('persistence failure is generic and cannot return a saved receipt', async () => {
  await assert.rejects(submitInquiry(input, {
    store: { save: async () => { throw new Error('private database detail'); } }, notify: inert,
  }), e => e.status === 503 && !e.message.includes('database'));
});
test('a saved inquiry remains a successful receipt if notification throws', async () => {
  const store = memoryStore();
  const result = await submitInquiry(input, { store, notify: async () => { throw new Error('provider unavailable'); } });
  assert.deepEqual(result, { saved: true, receiptId: input.requestId });
  assert.equal(store.rows.size, 1);
  assert.equal(store.rows.get(input.requestId).payload.comment, input.comment);
});
test('repeated request ID does not create another record and changed payload conflicts', async () => {
  const store = memoryStore();
  await submitInquiry(input, { store, notify: inert });
  await submitInquiry(input, { store, notify: inert });
  assert.equal(store.rows.size, 1);
  await assert.rejects(submitInquiry({ ...input, name: 'Other' }, { store, notify: inert }), e => e.status === 409);
});
test('unconfigured notifier does not claim or send', async () => {
  let touched = false;
  const notify = createOwnerNotifier({ store: { claim: async () => { touched = true; } }, fetchImpl: async () => { touched = true; } });
  assert.equal((await notify()).status, 'not_configured');
  assert.equal(touched, false);
});
const mailConfig = { clientId: 'test', clientSecret: 'test', refreshToken: 'test', sender: 'maksim@traffic-dojo.com' };
test('clear pre-send failure can retry; accepted mail cannot be replayed', async () => {
  const store = memoryStore();
  await submitInquiry(input, { store, notify: inert });
  let sends = 0;
  const notify = createOwnerNotifier({ store, mailConfig, sendMail: async () =>
    ++sends === 1 ? { status: 'retryable', reason: 'token_temporarily_unavailable' }
      : { status: 'accepted', providerId: 'gmail-test' } });
  assert.equal((await notify(input.requestId)).status, 'retryable');
  assert.equal((await notify(input.requestId)).status, 'accepted');
  assert.equal((await notify(input.requestId)).status, 'nothing_pending');
  assert.equal(sends, 2);
});
test('ambiguous Gmail outcome requires review and is never automatically resent', async () => {
  const store = memoryStore();
  await submitInquiry(input, { store, notify: inert });
  let sends = 0;
  const notify = createOwnerNotifier({ store, mailConfig, sendMail: async () => {
    sends++; return { status: 'needs_review', reason: 'send_outcome_unknown' };
  } });
  assert.equal((await notify(input.requestId)).status, 'needs_review');
  assert.equal((await notify(input.requestId)).status, 'nothing_pending');
  assert.equal(sends, 1);
});
test('accepted send with failed database acknowledgement keeps lease, avoiding replay', async () => {
  const store = memoryStore();
  await submitInquiry(input, { store, notify: inert });
  store.finish = async () => { throw new Error('database unavailable'); };
  let sends = 0;
  const notify = createOwnerNotifier({ store, mailConfig, sendMail: async () => {
    sends++; return { status: 'accepted', providerId: 'gmail-test' };
  } });
  assert.equal((await notify(input.requestId)).status, 'needs_review');
  assert.equal((await notify(input.requestId)).status, 'nothing_pending');
  assert.equal(store.rows.get(input.requestId).leased, true);
  assert.equal(sends, 1);
});
test('unexpected send exception is recorded conservatively as needs_review', async () => {
  let recorded;
  const notify = createOwnerNotifier({ mailConfig, store: {
    claim: async () => ({ id: input.requestId, payload: input, lease_token: 'lease' }),
    finish: async (id, lease, outcome) => { recorded = outcome; },
  }, sendMail: async () => { throw new Error('unknown'); } });
  assert.equal((await notify()).status, 'needs_review');
  assert.equal(recorded.status, 'needs_review');
});
test('queue adapter uses lease guarded outcome RPC and fails on stale acknowledgement', async () => {
  let call;
  const store = createInquiryStore({ rpc: async (name, args) => {
    call = { name, args }; return { data: true, error: null };
  } });
  await store.finish(input.requestId, 'lease', { status: 'accepted', providerId: 'gmail-test' });
  assert.deepEqual(call, { name: 'dojo_finish_inquiry_notification', args: {
    p_id: input.requestId, p_lease: 'lease', p_outcome: 'accepted', p_provider_id: 'gmail-test', p_error_code: null,
  } });
  const stale = createInquiryStore({ rpc: async () => ({ data: false }) });
  await assert.rejects(stale.finish(input.requestId, 'stale', { status: 'accepted' }), /completion_failed/);
});
test('RPC persistence errors never appear as successful save', async () => {
  const store = createInquiryStore({ rpc: async () => ({ data: null, error: { message: 'private' } }) });
  await assert.rejects(store.save(input.requestId, input), /save_failed/);
});
