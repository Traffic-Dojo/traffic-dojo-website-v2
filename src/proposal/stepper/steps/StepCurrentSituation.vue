<script setup lang="ts">
import { type z } from "zod";
import { CurrentSituationSchema } from "../schemas";
import FormStep from "../../../components/form-wizard/FormWizardStep.vue";
import AppRadio from "../../../components/inputs/AppRadio.vue";

const situations: {
  label: string;
  value: z.infer<typeof CurrentSituationSchema>["situation"];
}[] = [
  { label: "I'm new to digital marketing!", value: "new" },
  { label: "I'm working with a freelance!", value: "working" },
  { label: "I'm looking to replace my agency!", value: "looking" },
];
</script>

<template>
  <FormStep>
    <template #title>
      Which Best Describes <br />
      Your Current Situation?
    </template>

    <div class="flex flex-col gap-4 *:w-fit">
      <AppRadio
        :key="label"
        v-for="{ label, value } in situations"
        name="situation"
        :value
        :label
      />
    </div>
  </FormStep>
</template>
