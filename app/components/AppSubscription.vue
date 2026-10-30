<script setup lang="ts">
import {
  ErrorMessage,
  Field,
  Form,
  type SubmissionHandler,
} from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import type z from "zod";
import { EmailSubscriptionSchema } from "~~/schemas/subscription";
import { AnimatePresence, motion } from "motion-v";

defineEmits({
  inputEnter: null,
  inputLeave: null,
});

const { sendAnalyticsEvent } = useAnalytics();

const isSubmitted = ref(false);
const submitError = ref<string | null>(null);

const subscribeToEmails: SubmissionHandler<
  z.infer<typeof EmailSubscriptionSchema>
> = async (values, actions) => {
  submitError.value = null;
  try {
    const receipt = await $fetch<{ saved: boolean }>("/api/subscribe", { body: values, method: "POST" });
    if (!receipt.saved) throw new Error("Missing receipt");
    isSubmitted.value = true;
    actions.resetForm();
    try { sendAnalyticsEvent("subscription_saved"); } catch { /* no PII logging */ }
  } catch {
    submitError.value = "We could not save your subscription. Please try again.";
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <img
      src="~assets/images/bell.png"
      alt="Bell"
      class="aspect-square h-[58px] md:h-auto md:max-w-[152px]"
    />

    <AnimatePresence mode="wait">
      <motion.div
        v-if="!isSubmitted"
        class="flex max-w-[280px] flex-col items-center gap-4 md:max-w-full"
        :exit="{ opacity: 0 }"
      >
        <p
          class="max-w-[400px] text-center text-base font-normal tracking-wide md:text-xl"
        >
          Get access to exclusive digital marketing tips and case studies by
          subscribing to our emails
        </p>

        <Form
          v-slot="{ isSubmitting, handleSubmit }"
          :validation-schema="toTypedSchema(EmailSubscriptionSchema)"
          as="div"
        >
          <form
            class="flex w-full max-w-[200px] flex-col items-center gap-4 md:max-w-full"
            @submit="handleSubmit($event, subscribeToEmails)"
          >
            <Field
              name="email"
              type="email"
              placeholder="Enter your email"
              class="text-textLight placeholder:text-textGray border-textGray max-w-[220px] rounded-none border-t-0 border-r-0 border-b border-l-0 bg-transparent! px-2 py-2 placeholder:text-center autofill:bg-transparent! md:text-lg md:tracking-wider md:placeholder:text-left"
              @mouseenter="$emit('inputEnter')"
              @mouseleave="$emit('inputLeave')"
            />

            <ErrorMessage class="text-danger" name="email" />
            <p v-if="submitError" role="alert" class="text-danger">{{ submitError }}</p>

            <button
              type="submit"
              class="bg-accent cursor-pointer rounded-full px-8 py-2 text-xl font-medium"
              :disabled="isSubmitting"
            >
              Subscribe
            </button>
          </form>
        </Form>
      </motion.div>

      <motion.div
        v-else
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        class="flex items-center justify-center gap-4"
      >
        <img
          src="~assets/images/stars.png"
          class="aspect-square h-[56px] sm:h-[84px] md:h-[120px]"
          alt="Stars"
        />

        <div class="flex flex-col sm:gap-2 md:gap-4">
          <span class="text-xl font-medium sm:text-3xl md:text-6xl"
            >Thank you!</span
          >
          <span class="md:text-lg">Your subscription has been saved.</span>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
