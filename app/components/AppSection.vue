<script lang="ts" setup>
import { twMerge } from "tailwind-merge";
import { motion } from "motion-v";
import { sections } from "../configs/sections";

const props = defineProps<{ className?: string; id?: keyof typeof sections }>();

const id = props.id ? sections[props.id].id : undefined;
</script>

<template>
  <motion.div
    class="absolute inset-0 z-0"
    :initial="{ opacity: 0 }"
    :while-in-view="{ opacity: 1 }"
    :in-view-options="{ margin: '-200px 0px' }"
    :transition="{ duration: 1.6 }"
  >
    <slot name="gradients" />
  </motion.div>

  <motion.section
    :id="id"
    :class="
      twMerge(
        'relative z-10 mx-auto h-full w-full max-w-7xl px-6 py-6 md:px-10',
        className,
      )
    "
  >
    <slot />
  </motion.section>
</template>
