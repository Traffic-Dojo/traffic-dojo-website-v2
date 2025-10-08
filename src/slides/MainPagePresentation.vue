<script setup lang="ts">
import SwiperFixedSlider from "./../components/SwiperFixedSlider.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { createSwiperConfig } from "../config/swiper";

import SlideIntroduction from "../slides/SlideIntroduction.vue";
import SlideEnthusiasts from "../slides/SlideEnthusiasts.vue";
import SlidePurpose from "../slides/SlidePurpose.vue";
import SlideProblems from "../slides/SlideProblems.vue";
import SlideProposalTime from "../slides/SlideProposalTime.vue";
import SlideWhatWeCanDo from "../slides/SlideWhatWeCanDo.vue";

import "swiper/css";
import "swiper/css/pagination";

const swiperConfig = createSwiperConfig();

/**
 * TODO:
 * - [x] make a config for Swiper component and put it in one place (direction, class, modules, etc...);
 * - [x] fix gradient in SlideWhatWeCanDo, make a separate div, instead of using background: gradient
 * - [ ] remove magic numbers (5 in SwiperFixedSlider)
 */
</script>

<template>
  <Swiper v-bind="swiperConfig">
    <SwiperSlide>
      <SlideIntroduction />
    </SwiperSlide>

    <SwiperSlide>
      <SlideEnthusiasts />
    </SwiperSlide>

    <SwiperSlide>
      <SlidePurpose />
    </SwiperSlide>

    <SwiperSlide>
      <SlideProblems />
    </SwiperSlide>

    <SwiperSlide>
      <SlideProposalTime />
    </SwiperSlide>

    <SwiperSlide>
      <SwiperFixedSlider :slides="5">
        <template #default="{ activeSlideIndex, slideToIndex }">
          <SlideWhatWeCanDo
            :active-index="activeSlideIndex"
            @field-click="slideToIndex"
          />
        </template>
      </SwiperFixedSlider>
    </SwiperSlide>
  </Swiper>
</template>
