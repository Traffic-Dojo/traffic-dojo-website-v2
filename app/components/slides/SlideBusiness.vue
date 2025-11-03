<script lang="ts" setup>
import AppSection from "./../../components/AppSection.vue";
import SwiperFixedSlider from "../swiper/SwiperFixedSlider.vue";
import { motion } from "motion-v";

const slides = [
  {
    title: "Need Assistance with starting their online advertising journey.",
    description:
      "Starting online advertising can feel overwhelming. Questions like 'Do we need a blog?' or 'How much should we spend on Google Ads?' can leave you scratching your head. We get it! Running a business is tough, especially when every decision feels like a shot in the dark. That's why we're here. We're all about simplifying the advertising journey for you. Let us take the wheel while you focus on what you do best – running your business. Sound good?",
  },
  {
    title: "Lack an in-house marketing department of their own.",
    description:
      "Owning a full-fledged marketing department can be a game-changer for any business. However, it's also a hefty investment, often costing hundreds of thousands annually. But what if there was a smarter way to achieve your marketing goals without breaking the bank? That's where we come in. As a seasoned marketing agency, we offer a compelling alternative. By partnering with us, you gain access to a team of experts in analytics, media buying, design, and development. Why juggle the complexities of marketing in-house when you can partner with us?",
  },
  {
    title:
      "Have previously attempted marketing efforts but did not achieve satisfactory results.",
    description:
      "Starting online advertising can feel overwhelming. Questions like 'Do we need a blog?' or 'How much should we spend on Google Ads?' can leave you scratching your head. We get it! Running a business is tough, especially when every decision feels like a shot in the dark. That's why we're here. We're all about simplifying the advertising journey for you. Let us take the wheel while you focus on what you do best – running your business. Sound good?",
  },
  {
    title:
      "Feel hesitant or uncertain about allocating their marketing budgets effectively.",
    description:
      "Entering the advertising arena isn't merely about earmarking a budget; it's about deploying it with precision and efficiency. Wasting resources on ineffective campaigns is a prevalent issue in the market. However, in performance marketing, we're meticulous about optimizing your budget for maximum impact. Our goal isn't just to drive traffic to your website; it's to deliver qualified leads and actual conversions.",
  },
];
</script>

<template>
  <SwiperFixedSlider :slides="slides.length">
    <template #default="{ activeSlideIndex, slideToIndex }">
      <AppSection id="businesses" class-name="flex items-center justify-center">
        <template #gradients>
          <motion.div
            :initial="{ opacity: 0 }"
            :while-in-view="{
              opacity: [1, 0.75, 0.5, 0.15][activeSlideIndex],
              y: ['-20%', '-15%', '-10%', '-5%'][activeSlideIndex],
            }"
            :transition="{ duration: 0.6 }"
            class="earth absolute inset-0"
          />

          <motion.div
            :initial="{ opacity: 0 }"
            :while-in-view="{ opacity: [1, 0.75, 0.5, 0.15][activeSlideIndex] }"
            :transition="{ duration: 0.6 }"
            class="colors absolute inset-0"
          />
        </template>

        <div
          class="sticky top-1/4 mx-auto flex w-fit flex-col items-center justify-center gap-12 text-center lg:mx-auto lg:grid lg:grid-cols-[2fr,3fr] lg:gap-12 lg:text-left"
        >
          <motion.h2
            :initial="{ opacity: 0, y: -20 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 1 }"
            class="text-center text-3xl sm:text-5xl lg:text-left"
          >
            <span class="leading-relaxed font-semibold">Traffic Dojo</span> is
            <br />
            for
            <span
              class="decoration-accent font-medium underline underline-offset-8"
              >businesses</span
            >
            that:
          </motion.h2>

          <div class="flex max-w-[615px] flex-col gap-8">
            <motion.div
              :key="activeSlideIndex"
              class="relative flex flex-col gap-4 text-left"
            >
              <motion.h3
                initial="hidden"
                while-in-view="visible"
                :variants="{
                  hidden: { opacity: 0, y: -10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: activeSlideIndex > 0 ? 0.2 : 0.4,
                    },
                  },
                }"
                class="text-2xl font-medium sm:text-4xl sm:leading-[46px]"
              >
                {{ slides[activeSlideIndex]?.title }}
              </motion.h3>
              <motion.p
                initial="hidden"
                while-in-view="visible"
                :variants="{
                  hidden: { opacity: 0, y: -10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: activeSlideIndex > 0 ? 0.4 : 0.8,
                    },
                  },
                }"
                class="text-base leading-relaxed font-light md:text-xl md:leading-[36px]"
              >
                {{ slides[activeSlideIndex]?.description }}
              </motion.p>
            </motion.div>

            <motion.div
              :initial="{ opacity: 0, y: -20 }"
              :while-in-view="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.6, delay: 1.2 }"
              class="mx-auto flex items-center gap-[12px] lg:mx-0"
            >
              <button
                v-for="(_, i) in slides"
                :key="i"
                class="pointer-events-auto aspect-square h-4 cursor-pointer rounded-full bg-white p-0! transition-opacity duration-500"
                :class="{
                  'opacity-20': i !== activeSlideIndex,
                }"
                @click="slideToIndex(i)"
              />
            </motion.div>
          </div>
        </div>
      </AppSection>
    </template>
  </SwiperFixedSlider>
</template>

<style>
.earth {
  rotate: -6deg;
  translate: 0 5%;
  background: url("~/assets/images/earth_sm.png") no-repeat 50% 70% / contain;
  mix-blend-mode: screen;
  z-index: 999;
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
    100% 50% at 80% 50%,
    var(--color-gradient-blue),
    transparent
  );
}

@media screen and (min-width: 1024px) {
  .earth {
    rotate: 0deg;
    background: url("~/assets/images/earth.png") no-repeat center bottom /
      contain;
  }
}
</style>
