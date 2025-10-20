<script lang="ts" setup>
import AppSection from "./../../components/AppSection.vue";
import { motion } from "motion-v";
</script>

<template>
  <AppSection class-name="content-center" id="we">
    <template #gradients>
      <motion.div class="gradient-blue"></motion.div>
    </template>

    <div
      class="relative gap-24 md:grid md:h-svh md:grid-cols-2 md:items-center"
    >
      <div class="relative contents md:flex md:h-full md:items-center">
        <motion.div
          class="absolute right-0 hidden max-w-[360px] translate-x-[-18%] md:block md:max-w-full"
          :variants="{
            hidden: { x: -40, opacity: 0, transition: { duration: 1 } },
            visible: { x: 0, opacity: 1, transition: { duration: 2 } },
          }"
          initial="hidden"
          while-in-view="visible"
        >
          <img src="~/assets/images/newyork.png" alt="New York" />
        </motion.div>

        <motion.div
          class="absolute top-1/2 right-0 translate-x-2/5 -translate-y-1/2 overflow-hidden sm:translate-x-1/6 md:z-10 md:translate-x-1/4"
          :variants="{
            hidden: { x: 40, opacity: 0, transition: { duration: 0.8 } },
            visible: { x: 0, opacity: 1, transition: { duration: 2 } },
          }"
          initial="hidden"
          while-in-view="visible"
          :in-view-options="{ margin: '-300px 0px' }"
        >
          <img
            src="~/assets/images/statue.png"
            alt="Statue of Freedom"
            class="max-h-[70vh] min-h-[400px] md:max-h-screen"
          />
        </motion.div>

        <motion.div
          class="absolute bottom-0 -z-20 translate-y-1/4 md:bottom-auto md:-ml-20 md:block"
          :variants="{
            hidden: { x: 40, opacity: 0, transition: { duration: 1 } },
            visible: { x: 0, opacity: 1, transition: { duration: 2 } },
          }"
          initial="hidden"
          while-in-view="visible"
        >
          <img
            src="~/assets/images/city.png"
            alt="Building of New York City"
            class="h-full w-full"
          />
        </motion.div>
      </div>

      <div class="relative z-20 flex flex-col gap-[min(10svh,120px)]">
        <motion.div
          class="section-content flex flex-col gap-6"
          :variants="{
            hidden: { x: 40, opacity: 0, transition: { duration: 2 } },
            visible: { x: 0, opacity: 1, transition: { duration: 2 } },
          }"
          initial="hidden"
          while-in-view="visible"
        >
          <h2 class="text-3xl font-medium md:text-5xl">
            Marketing <br class="md:hidden" />
            Enthusiasts
          </h2>

          <p
            class="w-[75%] text-base leading-loose font-light md:text-xl md:leading-[38px] md:font-normal"
          >
            With over
            <span
              class="bg-gradient-blue/20 rounded-full border border-white px-4 py-1 whitespace-nowrap shadow-[0px_0px_15px_2px_rgba(255,255,255,0.4)]"
              >5 years of extensive experience</span
            >
            in affiliate marketing and a focus on crafting strategic marketing
            funnels, we're dedicated to delivering innovative strategies
            tailored to fuel your growth
          </p>
        </motion.div>

        <img
          src="~/assets/images/newyork.png"
          class="relative max-w-[360px] translate-x-[-25%] md:hidden"
          alt="New York"
        />
      </div>
    </div>
  </AppSection>
</template>

<style scoped>
.gradient-blue {
  --size: max(700px, 100svw);

  --initX: -45%;
  --initY: -40%;

  --endX: -55%;
  --endY: -45%;

  width: var(--size);
  height: var(--size);

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translateX(var(--initX)) translateY(var(--initY)) scale(1);
  background: radial-gradient(
    50% 50% at 50% 50%,
    var(--color-gradient-blue),
    transparent
  );

  animation: gradient-blue-animation 10s ease-in-out infinite alternate;
}

@media screen and (min-width: 768px) {
  .gradient-blue {
    --size: min(200svh, calc((100svh + 100svw) / 1.3));

    top: 0%;
    left: 50%;

    --initX: -75%;
    --initY: -55%;

    --endX: -40%;
    --endY: -40%;
  }
}

@keyframes gradient-blue-animation {
  0% {
    transform: translateX(var(--initX)) translateY(var(--initY)) scale(1);
  }

  100% {
    transform: translateX(var(--endX)) translateY(var(--endY)) scale(1);
  }
}
</style>
