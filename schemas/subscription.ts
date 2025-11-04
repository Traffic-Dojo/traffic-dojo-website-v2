import z from "zod";

export const EmailSubscriptionSchema = z.object({
  email: z.string("Email is required").email("Invalid email address."),
});
