<script setup lang="ts">
import type { z } from "zod";
import { TargetMarketSchema } from "../schemas";
import FormStep from "../../../components/form-wizard/FormWizardStep.vue";
import AppRadio from "../../../components/inputs/AppRadio.vue";

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
  <FormStep>
    <template #title>
      What's Your <br />
      Target Market?
    </template>

    <div class="flex flex-col gap-4 *:w-fit">
      <AppRadio
        v-for="{ label, value } in target_options"
        :key="value"
        :label="label"
        :value="value"
        name="market"
      />
    </div>
  </FormStep>
</template>
