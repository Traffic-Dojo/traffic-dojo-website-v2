<script setup lang="ts">
import FormWizardStep from "../../../form-wizard/FormWizardStep.vue";
import AppInput from "../../../inputs/AppInput.vue";
import AppTelephoneInput from "../../../inputs/AppTelephoneInput.vue";

defineProps({
  loading: { type: Boolean, required: true },
  error: { type: String, required: false, default: null },
});
</script>

<template>
  <FormWizardStep
    :loading="loading"
    :analytics="{ eventName: 'step_business_information' }"
    label-enabled="Submit"
  >
    <template #title>
      Enter your email and <br />
      get proposal request
    </template>

    <div
      class="flex flex-col gap-x-8 gap-y-6 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-5"
    >
      <AppInput
        label="Your Name*"
        name="name"
        class-name="md:col-span-2"
        placeholder="Enter your name"
      />

      <AppInput
        label="Your Email*"
        name="email"
        type="email"
        class-name="col-span-2 md:col-span-1"
        placeholder="Enter your email"
      />

      <AppInput
        label="Business Name*"
        name="business"
        placeholder="Enter your business name"
      />

      <AppInput
        label="Website (if applicable)"
        name="website"
        input-addon="https://"
        placeholder="Enter your website"
      />

      <AppTelephoneInput name="phone" />

      <AppInput
        label="Anything else you'd like to share? (if applicable)"
        name="comment"
        class-name="col-span-2 md:col-span-3"
        placeholder="Enter your commentary"
      />
    </div>
  </FormWizardStep>
</template>
