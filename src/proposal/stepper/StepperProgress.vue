<script setup lang="ts">
interface Props {
  currentStepIndex: number;
  maxSteps: number;
}

defineProps<Props>();
const emit = defineEmits<{
  "update:currentStepIndex": [value: number];
}>();

function goToStep(index: number, currentIndex: number) {
  if (index >= currentIndex) return;
  emit("update:currentStepIndex", index);
}
</script>

<template>
  <div class="flex items-center gap-3">
    <button
      v-for="i in maxSteps - 1"
      :key="i"
      type="button"
      class="bg-gray-modal before:bg-accent-secondary relative h-[5px] w-[36px] overflow-hidden rounded-full before:absolute before:inset-0 before:h-full before:w-[36px] before:origin-left before:scale-x-0 before:transition-transform before:duration-1000"
      :class="{
        'cursor-pointer before:scale-x-100': i - 1 <= currentStepIndex,
        'cursor-not-allowed': i - 1 > currentStepIndex,
      }"
      @click="goToStep(i - 1, currentStepIndex)"
    />
  </div>
</template>
