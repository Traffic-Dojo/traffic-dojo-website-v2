<script setup lang="ts">
import AppSection from "../components/AppSection.vue";
import { motion, type VariantType } from "motion-v";

const gradientVariants: Record<string, VariantType> = {
  hidden: { opacity: 0, transition: { duration: 2 } },
  visible: { opacity: 1, transition: { duration: 2, delay: 0.8 } },
};

const questionVariants: Record<string, VariantType> = {
  hidden: { opacity: 0, y: -40, transition: { duration: 1 } },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
};

const answerVariants: Record<string, VariantType> = {
  hidden: { opacity: 0, y: -40, transition: { duration: 1 } },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 4 } },
};

const buttonVariants: Record<string, VariantType> = {
  hidden: { opacity: 0, y: -40, transition: { duration: 1 } },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 5 } },
};

const problemVariants = (index: number): Record<string, VariantType> => {
  const isEven = index % 2 === 0;
  const rotateStart = isEven ? 3 : -3;
  const rotateEnd = isEven ? -3 : 3;

  return {
    hidden: {
      opacity: 0,
      y: -40,
      transition: { duration: 1 },
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: [null, `${rotateStart}deg`, `${rotateEnd}deg`],
      x: [null, "5px", "-5px"],
      transition: {
        duration: 1,
        delay: 1.2 + index * 0.5,
        rotate: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
        x: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      },
    },
  };
};
</script>

<template>
  <AppSection
    class-name="flex flex-col items-center justify-center gap-12 text-center md:text-left md:grid md:grid-cols-2 max-w-fit mx-auto md:grid-rows-[repeat(2,min-content)] md:items-center md:place-content-center md:gap-4"
  >
    <template #gradients>
      <motion.div
        class="gradient-problem"
        :variants="gradientVariants"
        initial="hidden"
        while-in-view="visible"
      ></motion.div>
    </template>

    <motion.h2
      class="text-3xl font-medium sm:text-4xl md:text-6xl"
      :variants="questionVariants"
      initial="hidden"
      while-in-view="visible"
    >
      All of those problems <br />
      look familiar? 👉🏻
    </motion.h2>

    <div
      class="order-1 col-start-1 row-start-2 flex flex-col items-center gap-6 md:items-start md:gap-[70px]"
    >
      <motion.span
        class="text-2xl font-medium sm:text-3xl md:text-4xl"
        :variants="answerVariants"
        initial="hidden"
        while-in-view="visible"
        >👇🏻 Let's solve them together!</motion.span
      >

      <motion.button
        class="bg-accent w-fit cursor-pointer rounded-full px-14 py-2 text-lg font-semibold tracking-[2%] shadow-[0px_0px_20.32px_0px_rgba(255,168,0,0.3)] sm:px-12 sm:py-4 sm:text-xl md:text-3xl"
        :variants="buttonVariants"
        initial="hidden"
        while-in-view="visible"
      >
        Let's do it
      </motion.button>
    </div>

    <div
      class="*:border-textGray row-span-2 flex flex-col items-center gap-6 text-center text-sm *:relative *:w-fit *:rounded-full *:border *:px-10 *:py-3 sm:text-xl md:gap-12 md:*:text-2xl"
    >
      <motion.span
        :variants="problemVariants(0)"
        initial="hidden"
        while-in-view="visible"
        >Need Assistance with starting...</motion.span
      >
      <motion.span
        :variants="problemVariants(1)"
        initial="hidden"
        while-in-view="visible"
        >In-house marketing department</motion.span
      >
      <motion.span
        :variants="problemVariants(2)"
        initial="hidden"
        while-in-view="visible"
        >Attempted marketing efforts</motion.span
      >
      <motion.span
        class="text-xs sm:text-xl"
        :variants="problemVariants(3)"
        initial="hidden"
        while-in-view="visible"
        >Feel hesitant about marketing budgets...</motion.span
      >
    </div>
  </AppSection>
</template>

<style scoped>
.gradient-problem,
.gradient-solve {
  position: absolute;
  width: 1400px;
  height: 100svh;
  right: 0;
}

.gradient-problem {
  background: radial-gradient(
    60% 50% at 120% 50%,
    #ec0000 0%,
    rgba(236, 0, 0, 0) 100%
  );
}

.gradient-solve {
  background: radial-gradient(
    60% 50% at 120% 50%,
    #1160fb 0%,
    rgba(236, 0, 0, 0) 100%
  );
}
</style>
