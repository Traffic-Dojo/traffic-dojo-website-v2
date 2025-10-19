<script setup lang="ts">
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

const validationSchema = [
  CurrentSituationSchema,
  TargetMarketSchema,
  MarketingNeedsSchema,
  MarketingBudgetSchema,
  BusinessInformationSchema,
];

function onSubmit(data: unknown) {
  console.log("data", data);
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

    <template #content>
      <FormWizard :validation-schema="validationSchema" @submit="onSubmit">
        <StepCurrentSituation />
        <StepTargetMarket />
        <StepMarketingNeeds />
        <StepMarketingBudget />
        <StepBusinessInformation />
      </FormWizard>
    </template>
  </AppModal>
</template>
