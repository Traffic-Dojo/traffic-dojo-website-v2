<script setup lang="ts">
import { z } from "zod";
import { MarketingBudgetSchema } from "../schemas";
import FormWizardStep from "../../../form-wizard/FormWizardStep.vue";
import AppRadioGroup from "../../../inputs/AppRadioGroup.vue";

const budgets: {
  label: string;
  value: z.infer<typeof MarketingBudgetSchema>["budget"];
}[] = [
  { label: "< $1,000", value: "1000" },
  { label: "$1,000-$2,000", value: "1000-2000" },
  { label: "$2,000-$5,000", value: "2000-5000" },
  { label: "$5,000-$10,000", value: "5000-10000" },
  { label: "$10,000-$25,000", value: "10000-25000" },
  { label: "$25,000+", value: "25000+" },
];
</script>

<template>
  <FormWizardStep>
    <template #title>
      What's Your Monthly<br />
      Digital Marketing Budget?
    </template>

    <AppRadioGroup name="budget" :items="budgets" />
  </FormWizardStep>
</template>
