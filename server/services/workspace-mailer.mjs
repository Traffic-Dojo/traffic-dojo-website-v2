// Server-only. No mailbox read, recipient chosen by the application, or automatic resend.
export const OWNER = 'maksim@traffic-dojo.com';
export const SEND_SCOPE = 'https://www.googleapis.com/auth/gmail.send';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SEND_URL = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send';
const fields = ['name', 'email', 'business', 'website', 'phone', 'comment', 'needs', 'budget', 'situation', 'market'];
const email = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9.-]*[A-Z0-9])?\.[A-Z]{2,}$/i;
const isEmail = (value) => typeof value === 'string' && value.length <= 254 && !/[\r\n]/.test(value) && email.test(value);

function rawMessage(job, sender) {
  if (!job || !/^[a-z0-9-]{1,100}$/i.test(job.id ?? '') || !job.payload ||
      !isEmail(job.payload.email)) throw new Error('Invalid inquiry');
  const rows = fields.filter((key) => job.payload[key] !== undefined).map((key) => {
    const value = job.payload[key];
    if (typeof value !== 'string' && !(Array.isArray(value) && value.every((v) => typeof v === 'string'))) {
      throw new Error('Invalid inquiry');
    }
    return `${key}: ${Array.isArray(value) ? value.join(', ') : value}`;
  });
  const text = `New Traffic Dojo website inquiry\nReference: ${job.id}\n\n${rows.join('\n')}\n\nReview and reply manually. This notification was sent only to the owner.`;
  if (Buffer.byteLength(text, 'utf8') > 16_384) throw new Error('Inquiry too long');
  const body = Buffer.from(text, 'utf8').toString('base64').match(/.{1,76}/g).join('\r\n');
  const message = [
    `From: Traffic Dojo <${sender}>`, `To: ${OWNER}`,
    `Reply-To: ${job.payload.email}`, 'Subject: New Traffic Dojo website inquiry',
    // Reconciliation hint only. Gmail does NOT document this as an idempotency key.
    `Message-ID: <website-inquiry-${job.id}@traffic-dojo.com>`,
    'MIME-Version: 1.0', 'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64', '', body,
  ].join('\r\n');
  return Buffer.from(message, 'utf8').toString('base64url');
}

/**
 * Results: accepted (not delivered), retryable (send was not accepted),
 * needs_review (outcome may be ambiguous), blocked (credentials/config), invalid.
 * Root's durable queue must record the result. Never retry needs_review automatically.
 */
export function createWorkspaceMailer({ clientId, clientSecret, refreshToken, sender,
  fetchImpl = fetch, now = Date.now, timeoutMs = 10_000 } = {}) {
  let cachedToken;
  let validUntil = 0;
  return async function notifyOwner(job) {
    if (![clientId, clientSecret, refreshToken, sender].every((v) => typeof v === 'string' && v.trim()) ||
        !isEmail(sender) || !sender.toLowerCase().endsWith('@traffic-dojo.com')) {
      return { status: 'blocked', reason: 'mail_not_configured' };
    }
    let raw;
    try { raw = rawMessage(job, sender); }
    catch { return { status: 'invalid', reason: 'invalid_inquiry' }; }
    if (!cachedToken || now() >= validUntil) {
      let response;
      try {
        response = await fetchImpl(TOKEN_URL, {
          method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret,
            refresh_token: refreshToken, grant_type: 'refresh_token' }),
          signal: AbortSignal.timeout(timeoutMs), redirect: 'error',
        });
      } catch { return { status: 'retryable', reason: 'token_temporarily_unavailable' }; }
      if (!response.ok) return response.status === 429 || response.status >= 500
        ? { status: 'retryable', reason: 'token_temporarily_unavailable' }
        : { status: 'blocked', reason: 'authorization_required' };
      let data;
      try { data = await response.json(); }
      catch { return { status: 'retryable', reason: 'invalid_token_response' }; }
      if (typeof data.access_token !== 'string' || !Number.isFinite(data.expires_in) || data.expires_in <= 0) {
        return { status: 'blocked', reason: 'invalid_token_response' };
      }
      // If Google includes granted scopes, reject an unexpected broader grant.
      if (data.scope && data.scope.split(' ').some((scope) => scope !== SEND_SCOPE)) {
        return { status: 'blocked', reason: 'unexpected_oauth_scope' };
      }
      cachedToken = data.access_token;
      validUntil = now() + Math.max(0, data.expires_in - 60) * 1000;
    }
    let response;
    try {
      response = await fetchImpl(SEND_URL, {
        method: 'POST', headers: { Authorization: `Bearer ${cachedToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw }), signal: AbortSignal.timeout(timeoutMs), redirect: 'error',
      });
    } catch { return { status: 'needs_review', reason: 'send_outcome_unknown' }; }
    if (response.status === 401) {
      cachedToken = undefined;
      return { status: 'retryable', reason: 'access_token_rejected' };
    }
    if (response.status === 429) return { status: 'retryable', reason: 'gmail_rate_limit' };
    if (!response.ok) return response.status >= 500
      ? { status: 'needs_review', reason: 'send_outcome_unknown' }
      : { status: 'blocked', reason: 'gmail_rejected' };
    let data;
    try { data = await response.json(); }
    catch { return { status: 'needs_review', reason: 'send_receipt_unknown' }; }
    if (typeof data.id !== 'string' || !data.id) return { status: 'needs_review', reason: 'send_receipt_unknown' };
    return { status: 'accepted', providerId: data.id };
  };
}
