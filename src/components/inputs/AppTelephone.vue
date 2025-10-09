<script setup lang="ts">
import { ref, onMounted } from "vue";
import intlTelInput, { type Iti } from "intl-tel-input";

interface Props {
  name: string;
}

defineProps<Props>();

const emit = defineEmits<{
  "update:number": [value: string];
  "update:valid": [value: boolean];
}>();

const disabled = ref(true);
let iti: Iti;

onMounted(() => {
  const input = document.getElementById("phone") as HTMLInputElement;

  iti = intlTelInput(input, {
    // @ts-expect-error unknown property in options
    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@24.4.0/build/js/utils.js",
    initialCountry: "us",
    strictMode: true,
  });

  iti.promise.then(() => {
    disabled.value = false;
  });

  input.addEventListener("countrychange", () => {
    iti.setNumber("");
  });
});

function handleInput() {
  emit("update:number", iti.getNumber());
  emit("update:valid", iti.isValidNumber() ?? false);
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <label
      for="phone"
      class="text-gray-secondary text-sm font-normal tracking-wide"
    >
      Phone*
    </label>

    <input
      id="phone"
      :name="name"
      type="tel"
      :disabled="disabled"
      class="border-gray-secondary focus:ring-accent-secondary rounded-full border bg-transparent px-6 py-2 pl-16 text-sm font-normal tracking-wide focus:ring-2 focus:outline-none"
      @input="handleInput"
    />
  </div>
</template>

<style scoped>
:global(.iti__selected-country-primary) {
  padding-left: 16px;
  border-top-left-radius: 9999px;
  border-bottom-left-radius: 9999px;
}
</style>
