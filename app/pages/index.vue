<script setup lang="ts">
import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/vue";

import SlideIntroduction from "./../components/slides/SlideIntroduction.vue";
import SlideEnthusiasts from "./../components/slides/SlideEnthusiasts.vue";
import SlidePurpose from "./../components/slides/SlidePurpose.vue";
import SlideProblems from "./../components/slides/SlideProblems.vue";
import SlideProposalTime from "./../components/slides/SlideProposalTime.vue";
import SlideWhatWeCanDo from "./../components/slides/SlideWhatWeCanDo.vue";
import SlideBusiness from "./../components/slides/SlideBusiness.vue";
import SlideFooter from "./../components/slides/SlideFooter.vue";

import { MotionConfig } from "motion-v";
import { useAppConfig } from "#app";
import AppHeader from "../components/AppHeader.vue";

const { initialSwiperConfig } = useAppConfig();
</script>

<template>
  <AppHeader />
  <MotionConfig :in-view-options="{ once: true }">
    <Swiper v-bind="initialSwiperConfig">
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
        <SlideBusiness />
      </SwiperSlide>

      <SwiperSlide>
        <SlideProblems />
      </SwiperSlide>

      <SwiperSlide>
        <SlideWhatWeCanDo />
      </SwiperSlide>

      <SwiperSlide>
        <SlideProposalTime />
      </SwiperSlide>

      <SwiperSlide>
        <SlideFooter />
      </SwiperSlide>
    </Swiper>
  </MotionConfig>
</template>
