<script setup lang="ts">
import type { z } from "zod";
import type { TargetMarketSchema } from "../schemas";
import FormWizardStep from "../../../form-wizard/FormWizardStep.vue";
import AppRadioGroup from "../../../inputs/AppRadioGroup.vue";

const target_options: {
  label: string;
  value: z.infer<typeof TargetMarketSchema>["market"];
}[] = [
  { label: "Consumers", value: "consumers" },
  { label: "Businesses/Organizations", value: "business" },
  { label: "E-Commerce", value: "commerce" },
  { label: "I'm Not Sure / Other", value: "other" },
];
</script>

<template>
  <FormWizardStep :analytics="{ eventName: 'step_target_market' }">
    <template #title>
      What's Your <br />
      Target Market?
    </template>

    <AppRadioGroup name="market" :items="target_options" />
  </FormWizardStep>
</template>
