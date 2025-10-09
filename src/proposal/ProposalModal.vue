<script setup lang="ts">
import AppModal from "../components/AppModal.vue";
import FormWizard from "../components/form-wizard/FormWizard.vue";

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

const open = defineModel({ type: Boolean });

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
  <AppModal :open="open">
    <FormWizard :validation-schema="validationSchema" @submit="onSubmit">
      <StepCurrentSituation />
      <StepTargetMarket />
      <StepMarketingNeeds />
      <StepMarketingBudget />
      <StepBusinessInformation />
    </FormWizard>
  </AppModal>
</template>
