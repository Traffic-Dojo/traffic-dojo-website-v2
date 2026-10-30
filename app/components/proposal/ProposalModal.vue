<script setup lang="ts">
import type z from "zod";
import type { ProposalSchema } from "~~/schemas/proposal";

import FormWizard from "../form-wizard/FormWizard.vue";

import {
  BusinessInformationSchema,
  CurrentSituationSchema,
  MarketingBudgetSchema,
  MarketingNeedsSchema,
  TargetMarketSchema,
} from "./stepper/schemas";

import StepCurrentSituation from "./stepper/steps/StepCurrentSituation.vue";
import StepTargetMarket from "./stepper/steps/StepTargetMarket.vue";
import StepMarketingNeeds from "./stepper/steps/StepMarketingNeeds.vue";
import StepMarketingBudget from "./stepper/steps/StepMarketingBudget.vue";
import StepBusinessInformation from "./stepper/steps/StepBusinessInformation.vue";

import AppModal from "../AppModal.vue";
import ProposalSuccessMessage from "~/components/proposal/ProposalSuccessMessage.vue";

const validationSchema = [
  CurrentSituationSchema,
  TargetMarketSchema,
  MarketingNeedsSchema,
  MarketingBudgetSchema,
  BusinessInformationSchema,
];

const isLoading = ref(false);
const isSubmitted = ref(false);
const savedReceiptId = ref<string | null>(null);
const error = ref<string | null>(null);

const requestId = ref<string | null>(null);
const requestPayload = ref<string | null>(null);
const { sendAnalyticsEvent } = useAnalytics();

async function onSubmit(values: z.infer<typeof ProposalSchema>) {
  if (isLoading.value || isSubmitted.value) return;
  isLoading.value = true;
  error.value = null;
  const payloadKey = JSON.stringify(values);
  if (requestPayload.value !== payloadKey) {
    requestId.value = crypto.randomUUID();
    requestPayload.value = payloadKey;
  }
  requestId.value ??= crypto.randomUUID();
  try {
    const receipt = await $fetch<{ saved: boolean; receiptId: string }>("/api/proposal", {
      body: { ...values, requestId: requestId.value }, method: "POST",
    });
    if (!receipt.saved || !receipt.receiptId) throw new Error("Missing receipt");
    savedReceiptId.value = receipt.receiptId;
    isSubmitted.value = true;
    // Measurement must never undo a confirmed save or include contact details.
    try { sendAnalyticsEvent("proposal_saved"); } catch { /* no PII logging */ }
  } catch {
    error.value = "We could not confirm your inquiry. Please try again.";
  } finally {
    isLoading.value = false;
  }
}

</script>

<template>
  <AppModal
    :title="{ hidden: true, label: 'Project inquiry' }"
    :description="{
      hidden: true,
      label: 'Tell us about your business and marketing goals',
    }"
    :with-close="true"
    variant="center"
  >
    <template #trigger>
      <slot />
    </template>

    <template #content="{ closeModal }">
      <ProposalSuccessMessage v-if="isSubmitted" :receipt-id="savedReceiptId" @close="closeModal" />

      <FormWizard
        v-else
        :validation-schema="validationSchema"
        @submit="onSubmit"
      >
        <StepCurrentSituation />
        <StepTargetMarket />
        <StepMarketingNeeds />
        <StepMarketingBudget />
        <StepBusinessInformation :loading="isLoading" :error="error" />
      </FormWizard>
    </template>
  </AppModal>
</template>
