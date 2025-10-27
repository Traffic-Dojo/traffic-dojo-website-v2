<script setup lang="ts">
import { type z } from "zod";
import { CurrentSituationSchema } from "../schemas";
import FormWizardStep from "../../../form-wizard/FormWizardStep.vue";
import AppRadioGroup from "../../../inputs/AppRadioGroup.vue";

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
  <FormWizardStep>
    <template #title>
      Which Best Describes <br />
      Your Current Situation?
    </template>

    <AppRadioGroup name="situation" :items="situations" />
  </FormWizardStep>
</template>
