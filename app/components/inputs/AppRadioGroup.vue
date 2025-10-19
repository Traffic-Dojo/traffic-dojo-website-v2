<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from "radix-vue";
import { useField } from "vee-validate";
import { toRef } from "vue";

const props = defineProps<{
  items: { label: string; value: string }[];
  name: string;
}>();

const name = toRef(props, "name");

const { value, handleChange } = useField<string>(name, undefined, {
  type: "radio",
});

const onRadioGroupChange = (newValue: string) => {
  handleChange(newValue);
};
</script>

<template>
  <RadioGroupRoot
    :model-value="value"
    @update:model-value="onRadioGroupChange"
    class="flex flex-col gap-4 *:w-fit"
  >
    <div
      v-for="item in props.items"
      class="flex items-center"
      :key="item.value"
    >
      <RadioGroupItem
        :id="`${props.name}-${item.value}`"
        class="peer sr-only"
        :value="item.value"
      >
        <RadioGroupIndicator />
      </RadioGroupItem>

      <label
        class="hover:bg-accent-secondary text-black-modal peer-focus-visible:focusable inline-flex cursor-pointer items-center justify-center rounded-full px-6 py-2 ring outline outline-black transition-colors duration-500"
        :class="{ 'bg-accent-secondary': item.value === value }"
        :for="`${props.name}-${item.value}`"
      >
        {{ item.label }}
      </label>
    </div>
  </RadioGroupRoot>
</template>
