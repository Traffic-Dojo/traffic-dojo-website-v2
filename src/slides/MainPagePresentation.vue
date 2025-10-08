<script setup lang="ts">
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
      <SlideWhatWeCanDo />
    </SwiperSlide>
  </Swiper>
</template>
