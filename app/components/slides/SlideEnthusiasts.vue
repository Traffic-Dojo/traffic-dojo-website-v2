<script lang="ts" setup>
import AppSection from "./../../components/AppSection.vue";
import { motion } from "motion-v";
</script>

<template>
  <AppSection id="we" class-name="content-center">
    <template #gradients>
      <motion.div class="gradient-blue" />
    </template>

    <div
      class="relative gap-24 md:grid md:h-svh md:grid-cols-2 md:items-center"
    >
      <div class="relative contents md:flex md:h-full md:items-center">
        <motion.div
          class="absolute left-4 hidden md:block"
          :variants="{
            hidden: { x: -40, opacity: 0, transition: { duration: 1 } },
            visible: { x: 0, opacity: 1, transition: { duration: 2 } },
          }"
          initial="hidden"
          while-in-view="visible"
        >
          <div
            class="location-card w-[min(30vw,380px)]"
            aria-label="Southern California-based team"
          >
            <span>Southern California</span>
            <span>based team</span>
          </div>
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
            src="~/assets/images/california-bear.webp"
            alt="Stylized California grizzly bear sculpture"
            class="max-h-[62vh] min-h-[340px] w-auto md:max-h-[78vh]"
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
            src="~/assets/images/southern-california-sunset.webp"
            alt="Southern California sunset with palm trees and coastal mountains"
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
            class="w-3/4 text-base leading-loose font-light md:text-xl md:leading-[38px] md:font-normal"
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

        <motion.div
          initial="hidden"
          while-in-view="visible"
          :variants="{
            hidden: { x: -40, opacity: 0, transition: { duration: 2 } },
            visible: { x: 0, opacity: 1, transition: { duration: 2 } },
          }"
          class="relative max-w-[360px] md:hidden"
        >
          <div
            class="location-card w-[min(86vw,360px)]"
            aria-label="Southern California-based team"
          >
            <span>Southern California</span>
            <span>based team</span>
          </div>
        </motion.div>
      </div>
    </div>
  </AppSection>
</template>

<style scoped>
.location-card {
  aspect-ratio: 1135 / 343;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(255 255 255 / 55%);
  border-radius: clamp(22px, 3vw, 48px);
  background: linear-gradient(180deg, #1c376b 0%, #17305d 58%, #2e4674 100%);
  box-shadow:
    inset 0 0 36px rgb(255 255 255 / 10%),
    0 18px 45px rgb(0 0 0 / 24%);
  color: white;
  font-size: clamp(0.85rem, 1.35vw, 1.45rem);
  font-weight: 700;
  line-height: 0.95;
  text-align: center;
  text-transform: uppercase;
  transform: rotate(-2deg);
}

.location-card span:first-child {
  margin-bottom: 0.3em;
}

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
