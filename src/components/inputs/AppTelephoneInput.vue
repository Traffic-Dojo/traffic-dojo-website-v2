<script setup lang="ts">
import { useField } from "vee-validate";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";

const props = defineProps<{ name: string }>();

const { value, handleBlur, errorMessage, setErrors, handleChange } = useField(
  props.name,
  undefined,
);

function onValidate({ valid }: { valid: boolean; number: string }) {
  if (!valid) {
    setErrors("Invalid phone number");
  } else {
    setErrors([]);
  }
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <label
      :for="name"
      class="text-gray-secondary text-sm font-normal tracking-wide"
    >
      Phone Number
    </label>

    <VueTelInput
      :value
      :name="name"
      @blur="handleBlur"
      @validate="onValidate"
      @on-input="handleChange"
    />
  </div>

  <span v-if="errorMessage" class="text-danger">{{ errorMessage }}</span>
</template>

<style scoped>
@reference "./../../styles/global.css";

.vue-tel-input {
  @apply max-w-xs rounded-full border-0 px-4 py-2 text-sm font-normal tracking-wide outline outline-black focus-within:shadow-none;
}
</style>
