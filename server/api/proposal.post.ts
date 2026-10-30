import { supabaseClient } from '~~/server/lib/supabase';
import { createInquiryStore, createOwnerNotifier, submitInquiry, IntakeError, workspaceMailConfig } from '../services/inquiry.mjs';

export default defineEventHandler(async (event) => {
  const body = await readRawBody(event);
  if (!body || Buffer.byteLength(body, 'utf8') > 16384) {
    throw createError({ statusCode: 413, statusMessage: 'Please submit a shorter inquiry.' });
  }
  let raw;
  try { raw = JSON.parse(body); }
  catch { throw createError({ statusCode: 400, statusMessage: 'Invalid request.' }); }
  const store = createInquiryStore(supabaseClient);
  const notify = createOwnerNotifier({
    store, mailConfig: workspaceMailConfig(),
  });
  try { return await submitInquiry(raw, { store, notify }); }
  catch (error) {
    if (error instanceof IntakeError) {
      throw createError({ statusCode: error.status, statusMessage: error.message });
    }
    throw createError({ statusCode: 503, statusMessage: 'Your inquiry could not be saved. Please try again.' });
  }
});
