<script setup lang="ts">
import { useField } from "vee-validate";
import { toRefs } from "vue";

interface Props {
  value: string;
  label: string;
  name: string;
  className?: string;
}

const props = defineProps<Props>();

const { name } = toRefs(props);

const { checked, handleChange } = useField(name, undefined, {
  type: "checkbox",
  checkedValue: props.value,
});
</script>

<template>
  <label
    class="outline-gray-secondary hover:bg-accent-secondary text-black-modal inline-flex cursor-pointer items-center justify-center rounded-full border-none px-6 py-2 outline outline-offset-0 transition-colors duration-700 hover:outline-0"
    :class="{ 'bg-accent-secondary': checked }"
  >
    <input
      type="checkbox"
      :name="name"
      :value="checked"
      @change="handleChange"
      class="sr-only"
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
