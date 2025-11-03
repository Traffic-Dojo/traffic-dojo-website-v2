<script setup lang="ts">
import FormWizardStep from "../../../form-wizard/FormWizardStep.vue";
import AppCheckbox from "../../../inputs/AppCheckbox.vue";

const checkboxes = [
  { value: "website", label: "A website" },
  { value: "website+", label: "A Better Website" },
  { value: "leads", label: "More leads" },
  { value: "leads+", label: "Better leads" },
  {
    value: "marketing partner",
    label: "A proactive, transparent marketing partner",
    className: "col-span-2",
  },
  {
    value: "refresh",
    label: "A brand refresh + more online visibility",
    className: "col-span-2",
  },
  { value: "SEO", label: "SEO partner" },
  {
    value: "social media partner",
    label: "A social media partner",
  },
  { value: "paid media partner", label: "A paid media partner" },
];
</script>

<template>
  <FormWizardStep :analytics="{ eventName: 'step_marketing_needs' }">
    <template #title>
      What Are Your Digital <br />
      Marketing Needs?
    </template>

    <div class="flex flex-wrap justify-start gap-x-4 gap-y-4">
      <AppCheckbox
        v-for="{ value, label, className } in checkboxes"
        name="needs"
        :key="value"
        :value="value"
        :label="label"
        :class-name="className"
      />
    </div>
  </FormWizardStep>
</template>
