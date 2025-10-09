<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef } from "vue";

interface Props {
  label: string;
  name: string;
  value: string;
}

const props = defineProps<Props>();

const name = toRef(props, "name");

const { checked, handleChange, handleBlur, handleReset } = useField(
  name,
  undefined,
  {
    type: "radio",
    checkedValue: props.value,
  },
);
</script>

<template>
  <label
    class="hover:bg-accent-secondary text-black-modal ring-black-modal inline-flex cursor-pointer items-center justify-center rounded-full px-6 py-2 ring transition-all duration-500 hover:ring-0"
    :class="{ 'bg-accent-secondary': checked }"
  >
    <input
      :checked="checked"
      :value="checked"
      :name="name"
      type="radio"
      class="sr-only"
      @change="handleChange"
      @blur="handleBlur"
      @reset="handleReset"
    />
    <span>{{ label }}</span>
  </label>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
