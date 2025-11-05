<script setup lang="ts">
import AppSection from "../../components/AppSection.vue";
import { motion, stagger, type VariantType } from "motion-v";

const contentVariants: Record<string, VariantType> = {
  hidden: {
    opacity: 0,
    x: -40,
    transition: { duration: 1.5 },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.5,
      delayChildren: stagger(0.5),
    },
  },
};
</script>

<template>
  <AppSection
    class-name="flex flex-col justify-center gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-6"
    id="purpose"
  >
    <template #gradients>
      <motion.div
        class="spark absolute inset-0"
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1, transition: { duration: 2, delay: 1.6 } }"
      ></motion.div>
      <motion.div
        class="colors absolute inset-0"
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1, transition: { duration: 2 } }"
      ></motion.div>
      <motion.div
        class="earth absolute inset-0"
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1, transition: { duration: 2 } }"
      ></motion.div>
    </template>

    <motion.div
      class="flex flex-col gap-3 font-medium lg:gap-12"
      :variants="contentVariants"
      initial="hidden"
      while-in-view="visible"
    >
      <motion.span
        class="text-2xl sm:text-3xl lg:text-4xl"
        :variants="contentVariants"
        >Our purpose:</motion.span
      >
      <motion.h2
        class="text-6xl sm:text-7xl lg:text-9xl"
        :variants="contentVariants"
      >
        Performing <br />
        marketing,
      </motion.h2>
      <motion.span
        class="text-textGray text-2xl lg:text-5xl"
        :variants="contentVariants"
        >not just launching ads</motion.span
      >
    </motion.div>

    <div
      class="relative mx-auto flex w-fit max-w-[650px] items-center justify-center px-[15%] sm:h-auto lg:w-full lg:px-0 [&>div]:absolute [&>div]:aspect-square"
    >
      <motion.div
        :initial="{ opacity: 0, transition: { duration: 1.6 } }"
        :while-in-view="{
          opacity: 1,
          transition: {
            duration: 1.6,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 1.6,
          },
        }"
        class="star top-[15%] left-[3%] -rotate-[20deg]"
      >
        <img
          src="~/assets/images/stars/star-ads.png"
          alt="Google Analytics star"
        />
      </motion.div>

      <motion.div
        class="star top-0 right-0 z-10 -rotate-3"
        :initial="{ opacity: 0, transition: { duration: 1 } }"
        :while-in-view="{
          opacity: 1,
          transition: {
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 1.6,
          },
        }"
      >
        <img src="~/assets/images/stars/star-click.png" alt="Click star" />
      </motion.div>

      <motion.div
        class="star bottom-[20%] left-0 rotate-[15deg]"
        :initial="{ opacity: 0, transition: { duration: 2 } }"
        :while-in-view="{
          opacity: 1,
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 1.6,
          },
        }"
      >
        <img src="~/assets/images/stars/star-dollar.png" alt="Facebook star" />
      </motion.div>

      <motion.div
        class="star right-[15%] bottom-[10%] scale-150 -rotate-12"
        :initial="{ opacity: 0, transition: { duration: 1.8 } }"
        :while-in-view="{
          opacity: 1,
          transition: {
            duration: 1.2,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 1.6,
          },
        }"
      >
        <img
          src="~/assets/images/stars/star-facebook.png"
          alt="Google Ads star"
        />
      </motion.div>

      <motion.div
        class="star right-0 bottom-[40%] scale-90 -rotate-12"
        :initial="{ opacity: 0, transition: { duration: 1.8 } }"
        :while-in-view="{
          opacity: 1,
          transition: {
            duration: 1.8,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 1.6,
          },
        }"
      >
        <img
          src="~/assets/images/stars/star-google-ads.png"
          alt="Dollar sign star"
        />
      </motion.div>

      <motion.video
        playsinline
        loop
        autoplay
        muted
        :controls="false"
        class="aspect-[1/2] max-h-[50svh] lg:max-h-[75svh]"
        :initial="{ opacity: 0, x: -100, y: 300, rotate: '30deg' }"
        :while-in-view="{
          opacity: 1,
          x: 0,
          y: 0,
          rotate: '30deg',
          transition: { duration: 2 },
        }"
      >
        <source src="~/assets/video/rocket.webm" type="video/webm" />
        <source src="~/assets/video/rocket.mov" type="video/quicktime" />
      </motion.video>
    </div>
  </AppSection>
</template>

<style scoped>
.spark {
  z-index: 999;
  transform: translateY(12vh) translateX(40%);
  background: url("~/assets/images/horizon-light.png") no-repeat center bottom /
    contain;
  mix-blend-mode: lighten;
}

.earth {
  mix-blend-mode: screen;
  background: url("~/assets/images/earth.png") no-repeat 50% 100% / contain;
}

.colors {
  --multiplier: 2;
  --minsize: 400px;

  --minmax: clamp(var(--minsize), 100%, max(100vh, 100vw));
  --size: calc(var(--minmax) * var(--multiplier));

  width: var(--size);
  height: var(--size);

  transform: translateY(-25%);

  background: radial-gradient(
    47% 47% at 50% 50%,
    var(--color-gradient-blue),
    transparent
  );
}

.star {
  width: clamp(80px, 2.0916rem + 8.1425vw, 126px);
}

@media screen and (max-width: 1024px) {
  .spark {
    display: none;
  }

  .earth {
    background: url("~/assets/images/earth_sm.png") no-repeat 50% 30svh /
      contain;
  }

  .colors {
    --multiplier: 2;
    --minsize: 400px;

    --minmax: clamp(var(--minsize), 100%, max(100vh, 100vw));
    --size: calc(var(--minmax) * var(--multiplier));

    width: var(--size);
    height: var(--size);

    background:
      radial-gradient(
        50% 50% at 65% 50%,
        rgba(236, 204, 255, 0.3) 0%,
        transparent
      ),
      radial-gradient(
        100% 50% at 80% 50%,
        var(--color-gradient-blue),
        transparent
      );
  }
}
</style>
