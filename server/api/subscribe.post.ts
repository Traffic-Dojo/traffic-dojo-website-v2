import { EmailSubscriptionSchema } from "~~/schemas/subscription";
import { supabaseClient } from "~~/server/lib/supabase";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { data, error } = EmailSubscriptionSchema.safeParse(body);

  if (error) {
    throw createError({ message: "Invalid email address" });
  }

  const { error: subscriptionError } = await supabaseClient
    .from("subscriptions")
    .insert(data);

  if (subscriptionError) {
    const ALREADY_EXIST_ERROR_CODE = "23505";

    throw createError({
      message:
        subscriptionError.code === ALREADY_EXIST_ERROR_CODE
          ? "Already subscribed"
          : "Internal server error",
    });
  }
});
