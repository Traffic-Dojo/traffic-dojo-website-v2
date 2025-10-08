<script setup lang="ts">
import AppSlide from "../components/AppSection.vue";
import CTAButton from "../components/CTAButton.vue";
import { motion, stagger, type VariantType } from "motion-v";

const variants: Record<string, VariantType> = {
  initial: {
    y: -40,
    opacity: 0,
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  },
  forward: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut",
      delayChildren: stagger(0.3),
    },
  },
};
</script>

<template>
  <AppSlide>
    <template #gradients>
      <div class="gradient-blue"></div>
      <div class="gradient-pink"></div>
    </template>

    <motion.div
      class="h-full content-center text-center lg:grid lg:grid-cols-2 lg:gap-20 lg:text-left"
      :variants="variants"
      initial="initial"
      while-in-view="forward"
    >
      <motion.div
        class="flex flex-col items-center gap-6 lg:items-end lg:gap-11 lg:justify-self-end"
        :variants="variants"
      >
        <img src="/images/logo.png" alt="Traffic Dojo Logo" />
        <span class="text-textGray text-[8px] tracking-wide sm:text-xs"
          >Dōjō (道場, Japanese) - The term literally means "place of the
          Way".</span
        >
      </motion.div>

      <motion.div
        class="mt-12 mb-20 flex flex-col items-center gap-8 lg:mt-0 lg:mb-0 lg:items-start lg:gap-10 lg:justify-self-start"
        :variants="variants"
      >
        <h1 class="text-5xl font-medium sm:text-7xl">
          Performance <br />
          Marketing Agency
        </h1>
        <span ref="taglineRef" class="flex gap-2"
          >From
          <span
            class="text-textDark rounded-full bg-gradient-to-br from-white from-65% to-[#c9c9c9] to-100% px-4 py-2 leading-[80%]"
            >Clicks</span
          >to<span
            class="bg-accent drop-shadow-accent 0 rounded-full px-4 py-2 leading-[80%] drop-shadow-lg/40"
            >Profit</span
          >
          Pathway</span
        >
      </motion.div>

      <CTAButton :variants="variants" />
    </motion.div>
  </AppSlide>
</template>

<style scoped>
.gradient-blue,
.gradient-pink {
  --multiplier: 1.3;
  --minsize: 400px;

  --minmax: clamp(var(--minsize), 100%, max(100vh, 100vw));
  --size: calc(var(--minmax) * var(--multiplier));

  position: absolute;

  width: var(--size);
  height: var(--size);

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.gradient-blue {
  background: radial-gradient(
    50% 50% at 50% 50%,
    var(--color-gradient-blue),
    transparent
  );
  animation: gradient-blue-animation 10s ease infinite alternate;
}

@keyframes gradient-blue-animation {
  0% {
    transform: translateX(-64%) translateY(-65%) scale(1);
  }

  25% {
    transform: translateX(-60%) translateY(-60%) scale(1.2);
  }

  50% {
    transform: translateX(-55%) translateY(-45%) scale(1.1);
  }

  75% {
    transform: translateX(-40%) translateY(-54%) scale(1);
  }

  100% {
    transform: translateX(-36%) translateY(-62%) scale(1.1);
  }
}

.gradient-pink {
  mix-blend-mode: exclusion;
  opacity: 75%;
  background: radial-gradient(
    50% 50% at 50% 50%,
    var(--color-gradient-pink),
    transparent
  );
  animation: gradient-pink-animation 15s ease infinite alternate;
}

@keyframes gradient-pink-animation {
  0% {
    transform: translateX(-36%) translateY(-65%) scale(1.1);
  }

  25% {
    transform: translateX(-46%) translateY(-55%) scale(0.9);
  }

  50% {
    transform: translateX(-48%) translateY(-52%) scale(1.1);
  }

  75% {
    transform: translateX(-55%) translateY(-56%) scale(1.1);
  }

  100% {
    transform: translateX(-64%) translateY(-60%) scale(1);
  }
}
</style>
