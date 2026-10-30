import { createError, getHeader, setHeader, type H3Event } from 'h3';
import { supabaseClient } from '../lib/supabase';
import { createInquiryStore, workspaceMailConfig } from '../services/inquiry.mjs';
import { handleNotificationBatch, NotificationBatchError } from '../services/lead-notification-batch.mjs';

export async function leadNotifications(event: H3Event, secret: string | undefined) {
  setHeader(event, 'Cache-Control', 'no-store');
  try {
    return await handleNotificationBatch({
      authorization: getHeader(event, 'authorization') ?? '', secret,
      mailConfig: workspaceMailConfig(), store: createInquiryStore(supabaseClient),
    });
  } catch (error) {
    if (error instanceof NotificationBatchError) {
      throw createError({ statusCode: error.status, statusMessage: error.message });
    }
    throw createError({ statusCode: 503, statusMessage: 'Owner notification processing is unavailable.' });
  }
}
