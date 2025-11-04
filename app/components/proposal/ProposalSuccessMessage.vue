<script setup lang="ts">
import { motion } from "motion-v";

defineEmits(["close"]);
</script>

<template>
  <motion.div
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    class="flex max-w-lg flex-grow flex-col items-center justify-around gap-y-8 text-center sm:items-start sm:gap-y-12 sm:text-left"
  >
    <span class="text-4xl font-semibold sm:text-7xl">Thank you!</span>

    <p class="sm:text-2xl">
      Your contacts has been sent and we are already preparing the best offer
      for you.
    </p>

    <button
      class="bg-accent text-black-modal mx-auto w-fit cursor-pointer rounded-full px-12 py-3 text-xl sm:m-0"
      @click="$emit('close')"
    >
      Close
    </button>
  </motion.div>
</template>
