<script setup lang="ts">
import { useField } from "vee-validate";
import { toRefs } from "vue";

interface Props {
  label: string;
  name: string;
  type?: string;
  className?: string;
  inputAddon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  inputAddon: "",
});

const { name } = toRefs(props);

const { value, errorMessage, handleChange, handleBlur, meta } = useField(name);
</script>

<template>
  <div class="flex flex-col gap-3" :class="className">
    <label
      :for="name"
      class="text-gray-secondary text-sm font-normal tracking-wide"
    >
      {{ label }}
    </label>

    <div
      class="border-gray-modal flex items-center overflow-hidden rounded-full border"
      :class="{ 'text-danger': errorMessage && meta.valid }"
    >
      <span
        v-if="inputAddon"
        class="text-gray-secondary bg-gray-100 px-4 py-2 text-sm font-normal"
      >
        {{ inputAddon }}
      </span>
      <input
        :id="name"
        :name="name"
        :type="type"
        :value
        @input="handleChange"
        @blur="handleBlur"
        class="flex-1 bg-transparent px-4 py-2 text-sm font-normal tracking-wide focus:outline-none"
      />
    </div>

    <span v-show="errorMessage || meta.valid" class="text-danger text-xs">{{
      errorMessage
    }}</span>
  </div>
</template>
