<script setup lang="ts">
import AppSection from "../components/AppSection.vue";
import { motion, type VariantType } from "motion-v";

const gradientVariants: Record<string, VariantType> = {
  hidden: { opacity: 0, transition: { duration: 1 } },
  visible: { opacity: 1, transition: { duration: 1.6 } },
};

const h2Variants: Record<string, VariantType> = {
  hidden: { opacity: 0, transition: { duration: 1 } },
  visible: { opacity: 1, transition: { duration: 1.6, delay: 0.8 } },
};

const imageVariants: Record<string, VariantType> = {
  hidden: { opacity: 0, transition: { duration: 1 } },
  visible: { opacity: 1, transition: { duration: 1.6, delay: 1.6 } },
};

const buttonVariants: Record<string, VariantType> = {
  hidden: { opacity: 0, transition: { duration: 1 } },
  visible: { opacity: 1, transition: { duration: 1.6, delay: 2.4 } },
};
</script>

<template>
  <AppSection
    class-name="flex flex-col items-center justify-center gap-12 md:grid md:grid-cols-2 md:grid-rows-[repeat(2,min-content)] content-center md:gap-x-6 md:gap-y-16 max-w-[1200px]"
  >
    <template #gradients>
      <motion.div
        class="gradient-blue"
        :variants="gradientVariants"
        initial="hidden"
        while-in-view="visible"
      ></motion.div>
    </template>

    <motion.h2
      class="text-center text-[42px] font-medium md:place-self-end md:justify-self-start md:text-left md:text-6xl"
      :variants="h2Variants"
      initial="hidden"
      while-in-view="visible"
    >
      It's Proposal Time
    </motion.h2>

    <motion.button
      class="bg-accent shadow-accent order-1 w-fit rounded-full px-8 py-3 text-lg tracking-wide md:place-self-start md:text-2xl md:font-semibold"
      :variants="buttonVariants"
      initial="hidden"
      while-in-view="visible"
    >
      Request proposal
    </motion.button>

    <motion.div
      class="md:row-span-2"
      :variants="imageVariants"
      initial="hidden"
      while-in-view="visible"
    >
      <img
        src="/images/proposal.png"
        alt="A ring with a note that says 'Will you be my client?'"
      />
    </motion.div>
  </AppSection>
</template>

<style scoped>
.gradient-blue {
  --size: min(400svh, calc(200svh + 200svh));

  position: absolute;
  width: var(--size);
  height: var(--size);
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgb(17, 96, 251, 0.9) 0%,
    rgba(255, 0, 229, 0) 100%
  );

  top: 0%;
  left: 50%;

  transform: translateX(-47%) translateY(-70%);

  animation: gradient-move 3s ease-in-out infinite alternate;
}

@keyframes gradient-move {
  from {
    transform: translateX(-47%) translateY(-70%);
  }

  to {
    transform: translateX(-43%) translateY(-60%);
  }
}
</style>
