<script setup lang="ts">
import { useField } from "vee-validate";
import { toRefs } from "vue";

interface Props {
  label: string;
  name: string;
  type?: string;
  className?: string;
  inputAddon?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});

const { name } = toRefs(props);

const { value, errorMessage, handleChange, handleBlur, meta } = useField(name);
</script>

<template>
  <div class="flex flex-col gap-3" :class="className">
    <label
      :for="name"
      class="text-sm font-normal tracking-wide"
      :class="{
        'text-danger': errorMessage && meta.touched,
        'text-gray-secondary': !(errorMessage && meta.touched),
      }"
    >
      {{ label }}
    </label>

    <div
      class="has-focus:focusable flex items-center overflow-hidden rounded-full outline outline-black"
      :class="{ 'text-danger outline-danger': errorMessage && meta.touched }"
    >
      <span
        v-if="inputAddon"
        class="bg-gray-100 py-2 pr-2 pl-4 text-sm font-normal"
        :class="{
          'text-danger': errorMessage && meta.touched,
          'text-gray-secondary': !(errorMessage && meta.touched),
        }"
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
        class="flex-1 bg-transparent px-4 py-2 text-sm font-normal tracking-wide focus-visible:outline-none"
        :class="{ 'pr-4 pl-2': inputAddon }"
        :placeholder
      />
    </div>
  </div>
</template>
