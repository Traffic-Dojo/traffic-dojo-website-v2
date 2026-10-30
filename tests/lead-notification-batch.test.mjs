import test from 'node:test';
import assert from 'node:assert/strict';
import { authorizedNotificationCaller, handleNotificationBatch, runNotificationBatch } from '../server/services/lead-notification-batch.mjs';

const secret = 'test-only-long-random-secret';
const mailConfig = { clientId: 'test', clientSecret: 'test', refreshToken: 'test', sender: 'maksim@traffic-dojo.com' };
test('caller authentication fails closed for absent, malformed and incorrect secrets', () => {
  for (const [header, value] of [[undefined, undefined], ['Bearer undefined', undefined], ['', secret],
    ['Bearer wrong', secret], [`Basic ${secret}`, secret], [`Bearer ${secret} `, secret]]) {
    assert.equal(authorizedNotificationCaller(header, value), false);
  }
  assert.equal(authorizedNotificationCaller(`Bearer ${secret}`, secret), true);
});
test('unauthorized run cannot claim or send, even with configured mail', async () => {
  let touched = false;
  await assert.rejects(handleNotificationBatch({ authorization: 'Bearer wrong', secret, mailConfig,
    store: { claim: async () => { touched = true; } }, sendMail: async () => { touched = true; },
  }), error => error.status === 401);
  assert.equal(touched, false);
});
test('authorized but unconfigured run leaves all queue jobs untouched', async () => {
  let touched = false;
  await assert.rejects(handleNotificationBatch({ authorization: `Bearer ${secret}`, secret, mailConfig: {},
    store: { claim: async () => { touched = true; } }, sendMail: async () => { touched = true; },
  }), error => error.status === 503);
  assert.equal(touched, false);
});
test('batch never exceeds five jobs and returns statuses only', async () => {
  let calls = 0;
  const result = await runNotificationBatch(async () => { calls++; return { status: 'accepted', receiptId: 'private' }; });
  assert.equal(calls, 5);
  assert.deepEqual(result, { results: Array(5).fill('accepted') });
});
test('retryable, blocked, ambiguous and empty queue stop without claiming another job', async () => {
  for (const status of ['retryable', 'blocked', 'needs_review', 'nothing_pending', 'not_configured']) {
    let calls = 0;
    const result = await runNotificationBatch(async () => { calls++; return { status }; });
    assert.equal(calls, 1, status);
    assert.deepEqual(result, { results: [status] });
  }
});
test('configured revoked authorization is durably flagged once and stops batch', async () => {
  let claims = 0; const recorded = [];
  const result = await handleNotificationBatch({ authorization: `Bearer ${secret}`, secret, mailConfig,
    store: { claim: async () => { claims++; return { id: 'test-id', lease_token: 'test-lease' }; },
      finish: async (id, lease, outcome) => { recorded.push(outcome); } },
    sendMail: async () => ({ status: 'blocked', reason: 'authorization_required' }),
  });
  assert.equal(claims, 1);
  assert.deepEqual(recorded, [{ status: 'blocked', reason: 'authorization_required' }]);
  assert.deepEqual(result, { results: ['blocked'] });
});
