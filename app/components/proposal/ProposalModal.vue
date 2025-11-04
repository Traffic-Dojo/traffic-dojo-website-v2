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
const error = ref<string | null>(null);

function onSubmit(values: z.infer<typeof ProposalSchema>) {
  isLoading.value = true;
  error.value = null;

  $fetch("/api/proposal", { body: values, method: "POST" })
    .then(() => {
      isSubmitted.value = true;
    })
    .catch((error) => {
      error.value = error.message;
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>

<template>
  <AppModal
    :title="{ hidden: true, label: 'Proposal form' }"
    :description="{
      hidden: true,
      label: 'Asking user business information',
    }"
    :with-close="true"
    variant="center"
  >
    <template #trigger>
      <slot />
    </template>

    <template #content="{ closeModal }">
      <ProposalSuccessMessage v-if="isSubmitted" @close="closeModal" />

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
