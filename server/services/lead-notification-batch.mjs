import { timingSafeEqual } from 'node:crypto';
import { createOwnerNotifier, workspaceMailConfigured } from './inquiry.mjs';

export class NotificationBatchError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
export function authorizedNotificationCaller(supplied, secret) {
  if (typeof secret !== 'string' || !secret || typeof supplied !== 'string') return false;
  const expected = `Bearer ${secret}`;
  return Buffer.byteLength(supplied) === Buffer.byteLength(expected) &&
    timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}
export async function runNotificationBatch(notify) {
  const results = [];
  // A small fallback batch; no self-invocation or unbounded queue drain.
  for (let index = 0; index < 5; index++) {
    const { status } = await notify();
    results.push(status);
    if (['nothing_pending', 'retryable', 'not_configured', 'blocked', 'needs_review'].includes(status)) break;
  }
  return { results };
}
export async function handleNotificationBatch({ authorization, secret, mailConfig, store, sendMail }) {
  if (!authorizedNotificationCaller(authorization, secret)) {
    throw new NotificationBatchError(401, 'Unauthorized');
  }
  if (!workspaceMailConfigured(mailConfig)) {
    throw new NotificationBatchError(503, 'Owner notifications are not configured.');
  }
  return runNotificationBatch(createOwnerNotifier({ store, mailConfig, sendMail }));
}
