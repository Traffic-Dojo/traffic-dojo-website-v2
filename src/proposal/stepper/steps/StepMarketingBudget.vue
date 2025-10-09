<script setup lang="ts">
import { z } from "zod";
import { MarketingBudgetSchema } from "../schemas";
import FormStep from "../../../components/form-wizard/FormWizardStep.vue";
import AppRadio from "../../../components/inputs/AppRadio.vue";

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
  <FormStep>
    <template #title>
      What's Your Monthly<br />
      Digital Marketing Budget?
    </template>

    <div class="grid grid-flow-col grid-cols-2 grid-rows-4 gap-4 *:w-fit">
      <AppRadio
        v-for="{ label, value } in budgets"
        :key="value"
        :label="label"
        :value="value"
        name="budget"
      />
    </div>
  </FormStep>
</template>
