<script lang="ts" setup>
import { useAnimate, motion, stagger } from "motion-v";

import AppBadges from "../../components/AppBadges.vue";
import AppContacts from "../../components/AppContacts.vue";
import AppSection from "../../components/AppSection.vue";
import AppSubscription from "../../components/AppSubscription.vue";
import AppSocials from "../../components/AppSocials.vue";

const [scope, animate] = useAnimate();

function animateEnterGradient() {
  animate(scope.value, { x: "-25%", scale: 1.2 }, { duration: 1 });
}

function animateLeaveGradient() {
  animate(scope.value, { x: "-25%", scale: 1 }, { duration: 0.5 });
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 2, delayChildren: stagger(0.5) },
  },
};
</script>

<template>
  <AppSection class-name="flex items-center justify-center">
    <template #gradients>
      <motion.div
        :initial="{ opacity: 0, x: '-25%' }"
        :while-in-view="{ opacity: 1, x: '-25%' }"
        ref="scope"
        class="gradient-blue"
      />
    </template>

    <motion.div
      :variants="listVariants"
      initial="hidden"
      while-in-view="visible"
      class="grid grid-rows-[repeat(4,min-content)] content-center items-center gap-10"
    >
      <motion.div
        :variants="listVariants"
        class="flex flex-col items-center gap-4 md:grid md:grid-cols-2 md:items-center md:gap-12"
      >
        <img
          src="~assets/images/logo.png"
          alt="Traffic Dojo Logo"
          class="w-[40%] min-w-[200px] justify-self-end md:w-full md:max-w-[400px]"
        />

        <span
          class="text-gray justify-self-start text-xs font-extralight sm:text-sm md:text-3xl"
          >From Clicks to Profit Pathway</span
        >
      </motion.div>

      <motion.div
        :variants="listVariants"
        class="flex flex-col items-center gap-4 md:grid md:grid-cols-2 md:items-center md:gap-12"
      >
        <AppSocials size="large" />
        <AppContacts />
      </motion.div>

      <motion.div :variants="listVariants">
        <AppSubscription
          @input-enter="animateEnterGradient"
          @input-leave="animateLeaveGradient"
        />
      </motion.div>

      <motion.div :variants="listVariants">
        <AppBadges />
      </motion.div>
    </motion.div>
  </AppSection>
</template>

<style>
.gradient-blue {
  --multiplier: 2;
  --minsize: 400px;

  --minmax: clamp(var(--minsize), 100%, max(100vh, 100vw));
  --size: calc(var(--minmax) * var(--multiplier));

  width: var(--size);
  height: var(--size);

  background: radial-gradient(
    50% 50% at 50% 60%,
    var(--color-gradient-blue) 0%,
    transparent
  );
}
</style>
