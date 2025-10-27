<script setup lang="ts">
import { useField } from "vee-validate";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";

const props = defineProps<{ name: string; placeholder?: string }>();

const { value, handleBlur, errorMessage, handleChange, meta } = useField(
  props.name,
  undefined,
  { validateOnValueUpdate: true, validateOnMount: false },
);
</script>

<template>
  <div class="flex flex-col gap-3">
    <label
      :for="name"
      class="text-sm font-normal tracking-wide"
      :class="{
        'text-danger': errorMessage && meta.touched,
        'text-gray-secondary': !(errorMessage && meta.touched),
      }"
    >
      Phone Number
    </label>

    <VueTelInput
      :value
      :name="name"
      mode="international"
      @blur="handleBlur"
      @on-input="handleChange"
      :placeholder
      :class="[
        'has-focus:focusable! h-[36px]! max-w-xs! rounded-full! border-0! px-4! py-2! text-sm! font-normal! tracking-wide! outline! outline-black! focus-within:shadow-none!',
        {
          'text-danger! outline-danger!': errorMessage && meta.touched,
        },
      ]"
    />
  </div>
</template>
