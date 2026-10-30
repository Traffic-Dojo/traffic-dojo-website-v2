import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorkspaceMailer, OWNER, SEND_SCOPE } from '../server/services/workspace-mailer.mjs';
const job = { id: 'b9b20f3f-976c-404c-b35a-8ec637aac611', payload: {
  name: 'Иван', email: 'visitor@example.com', business: 'Example', comment: 'Test only',
  to: 'unrelated@example.com', from: 'forged@example.com', needs: ['website'],
} };
const config = { clientId: 'test-id', clientSecret: 'test-secret', refreshToken: 'test-refresh', sender: OWNER };
const token = () => Response.json({ access_token: 'mock-access', expires_in: 3600, scope: SEND_SCOPE });
const setup = (responses) => {
  const calls = [];
  const notify = createWorkspaceMailer({ ...config, fetchImpl: async (url, options) => {
    calls.push({ url, ...options });
    const next = responses.shift();
    if (next instanceof Error) throw next;
    return typeof next === 'function' ? next() : next;
  } });
  return { calls, notify };
};
test('unconfigured mail never makes a network request', async () => {
  let calls = 0;
  const notify = createWorkspaceMailer({ fetchImpl: async () => { calls++; } });
  assert.equal((await notify(job)).status, 'blocked'); assert.equal(calls, 0);
});
test('fixed owner, visitor reply-to, UTF-8 body and no arbitrary recipients', async () => {
  const { notify, calls } = setup([token, Response.json({ id: 'gmail-1' })]);
  assert.deepEqual(await notify(job), { status: 'accepted', providerId: 'gmail-1' });
  assert.equal(calls[0].url, 'https://oauth2.googleapis.com/token');
  assert.equal(calls[0].body.get('grant_type'), 'refresh_token');
  assert.equal(calls[1].url, 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send');
  const mime = Buffer.from(JSON.parse(calls[1].body).raw, 'base64url').toString();
  assert.ok(mime.includes(`To: ${OWNER}\r\n`));
  assert.ok(mime.includes('Reply-To: visitor@example.com\r\n'));
  assert.ok(!mime.includes('unrelated@example.com')); assert.ok(!mime.includes('forged@example.com'));
  const body = Buffer.from(mime.split('\r\n\r\n')[1].replaceAll('\r\n', ''), 'base64').toString();
  assert.ok(body.includes('Иван')); assert.ok(body.includes('Test only'));
});
test('header injection and overlong payload rejected before network', async () => {
  const { notify, calls } = setup([]);
  assert.equal((await notify({ ...job, payload: { email: 'visitor@example.com\r\nBcc: evil@example.com' } })).status, 'invalid');
  assert.equal((await notify({ ...job, payload: { email: 'visitor@example.com', comment: 'x'.repeat(20_000) } })).status, 'invalid');
  assert.equal(calls.length, 0);
});
test('token exchange network failure is retryable; no mail send attempted', async () => {
  const { notify, calls } = setup([new Error('timeout')]);
  assert.equal((await notify(job)).status, 'retryable'); assert.equal(calls.length, 1);
});
test('revoked refresh token is blocked; unexpected broader scope is blocked', async () => {
  const a = setup([Response.json({ error: 'invalid_grant' }, { status: 400 })]);
  assert.equal((await a.notify(job)).status, 'blocked'); assert.equal(a.calls.length, 1);
  const b = setup([Response.json({ access_token: 'test', expires_in: 1000, scope: 'https://mail.google.com/' })]);
  assert.equal((await b.notify(job)).reason, 'unexpected_oauth_scope'); assert.equal(b.calls.length, 1);
});
test('ambiguous send timeout and server error require manual review, not resend', async () => {
  const a = setup([token, new Error('timeout')]);
  assert.deepEqual(await a.notify(job), { status: 'needs_review', reason: 'send_outcome_unknown' });
  assert.equal(a.calls.length, 2);
  const b = setup([token, new Response('', { status: 503 })]);
  assert.equal((await b.notify(job)).status, 'needs_review'); assert.equal(b.calls.length, 2);
});
test('Gmail 429 can be retried; cache avoids another token request', async () => {
  const { notify, calls } = setup([token, new Response('', { status: 429 }), Response.json({ id: 'retry-ok' })]);
  assert.equal((await notify(job)).status, 'retryable');
  assert.equal((await notify(job)).providerId, 'retry-ok');
  assert.equal(calls.filter(c => c.url.endsWith('/token')).length, 1);
});
test('successful HTTP without a message receipt is ambiguous', async () => {
  const { notify } = setup([token, Response.json({})]);
  assert.deepEqual(await notify(job), { status: 'needs_review', reason: 'send_receipt_unknown' });
});
test('Gmail rejection does not leak provider response, tokens or inquiry data', async () => {
  const { notify } = setup([token, Response.json({ error: { message: 'sensitive raw detail' } }, { status: 403 })]);
  assert.deepEqual(await notify(job), { status: 'blocked', reason: 'gmail_rejected' });
});
