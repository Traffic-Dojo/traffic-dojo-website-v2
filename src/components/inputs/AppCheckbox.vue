<script setup lang="ts">
import { CheckboxRoot } from "radix-vue";
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
  <div>
    <CheckboxRoot
      :checked="checked"
      @update:checked="handleChange"
      class="peer sr-only"
      :for="value"
    >
    </CheckboxRoot>
    <label
      @click="handleChange"
      :for="value"
      class="outline-gray-secondary hover:bg-accent-secondary text-black-modal inline-flex cursor-pointer items-center justify-center rounded-full border-none px-6 py-2 outline outline-offset-0 transition-colors duration-700 peer-focus:ring-2 peer-focus:ring-black"
      :class="{ 'bg-accent-secondary': checked }"
    >
      {{ label }}
    </label>
  </div>
</template>
