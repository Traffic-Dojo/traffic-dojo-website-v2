import { EmailSubscriptionSchema } from "~~/schemas/subscription";
import { supabaseClient } from "~~/server/lib/supabase";

export default defineEventHandler(async (event) => {
  const { data, success } = EmailSubscriptionSchema.safeParse(await readBody(event));
  if (!success) throw createError({ statusCode: 422, statusMessage: "Enter a valid email address." });
  const { error } = await supabaseClient.from("subscriptions").insert(data);
  if (error && error.code !== "23505") {
    throw createError({ statusCode: 503, statusMessage: "Subscription could not be saved. Please try again." });
  }
  return { saved: true };
});
