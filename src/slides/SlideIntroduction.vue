<script setup lang="ts">
import AppSlide from "../components/AppSlide.vue";
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

// TODO: add modal popup handle and analytics handle
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
  --size: min(200svh, calc((100svh + 100svw) / 0.3));

  --x1: -75%;
  --x2: -50%;
  --x3: -20%;

  --y1: -57%;
  --y2: -53%;

  width: var(--size);
  height: var(--size);

  position: absolute;
  top: 0%;
  left: 50%;
}

.gradient-blue {
  background: radial-gradient(
    50% 50% at 50% 50%,
    #1160fb 0%,
    rgba(255, 0, 229, 0) 100%
  );
  transform: translateX(var(--x1)) translateY(var(--y1)) scale(1);
  animation: gradient-blue-animation 10s ease infinite alternate;
}

.gradient-pink {
  mix-blend-mode: exclusion;
  opacity: 80%;
  transform: translateX(var(--x3)) translateY(var(--y1)) scale(1);
  background: radial-gradient(
    50% 50% at 50% 50%,
    #ff00e6 0%,
    rgba(255, 0, 229, 0) 100%
  );
  animation: gradient-pink-animation 10s ease infinite alternate;
}

@keyframes gradient-blue-animation {
  0% {
    transform: translateX(var(--x1)) translateY(var(--y1)) scale(1);
  }

  50% {
    transform: translateX(var(--x2)) translateY(var(--y2)) scale(1.1);
  }

  100% {
    transform: translateX(var(--x3)) translateY(var(--y1)) scale(1);
  }
}

@keyframes gradient-pink-animation {
  0% {
    transform: translateX(var(--x3)) translateY(var(--y1)) scale(1);
  }

  50% {
    transform: translateX(var(--x2)) translateY(var(--y2)) scale(1.1);
  }

  100% {
    transform: translateX(var(--x1)) translateY(var(--y1)) scale(1);
  }
}
</style>
