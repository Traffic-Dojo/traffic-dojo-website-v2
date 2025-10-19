<script setup lang="ts">
import FormStep from "../../../components/form-wizard/FormWizardStep.vue";
import AppInput from "../../../components/inputs/AppInput.vue";
import AppTelephoneInput from "../../../components/inputs/AppTelephoneInput.vue";
</script>

<template>
  <FormStep>
    <template #title>
      Enter your email and <br />
      get proposal request
    </template>

    <div
      class="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3 md:gap-x-12 md:gap-y-5"
    >
      <AppInput label="Your Name*" name="name" class-name="md:col-span-2" />

      <AppInput
        label="Your Email*"
        name="email"
        type="email"
        class-name="col-span-2 md:col-span-1"
      />

      <AppInput label="Business Name*" name="business" />

      <AppInput
        label="Website (if applicable)"
        name="website"
        input-addon="https://"
      />

      <AppInput
        label="Anything else you'd like to share? (if applicable)"
        name="comment"
        class-name="col-span-2 md:col-span-3"
      />

      <AppTelephoneInput name="phone" />
    </div>
  </FormStep>
</template>
