<script lang="ts" setup>
import { twMerge } from "tailwind-merge";
import { motion } from "motion-v";

defineProps({
  className: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <motion.div
    class="absolute inset-0 -z-50"
    :initial="{ opacity: 0 }"
    :while-in-view="{ opacity: 1 }"
    :in-view-options="{ margin: '-200px 0px' }"
    :transition="{ duration: 1.6 }"
  >
    <slot name="gradients" />
  </motion.div>

  <motion.section
    :class="
      twMerge('mx-auto h-full w-full max-w-7xl px-6 py-6 md:px-10', className)
    "
  >
    <slot />
  </motion.section>
</template>
