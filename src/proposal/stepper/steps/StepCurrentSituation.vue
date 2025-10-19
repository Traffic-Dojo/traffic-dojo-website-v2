<script setup lang="ts">
import { type z } from "zod";
import { CurrentSituationSchema } from "../schemas";
import FormStep from "../../../components/form-wizard/FormWizardStep.vue";
import AppRadioGroup from "../../../components/inputs/AppRadioGroup.vue";
import AppTelephoneInput from "../../../components/inputs/AppTelephoneInput.vue";

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

    <AppTelephoneInput name="phone" />

    <AppRadioGroup name="situation" :items="situations" />
  </FormStep>
</template>
