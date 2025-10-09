<script setup lang="ts">
import "swiper/css";
import "swiper/css/pagination";

import { ref } from "vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { createSwiperConfig } from "../config/swiper";

import SlideIntroduction from "./slides/SlideIntroduction.vue";
import SlideEnthusiasts from "./slides/SlideEnthusiasts.vue";
import SlidePurpose from "./slides/SlidePurpose.vue";
import SlideProblems from "./slides/SlideProblems.vue";
import SlideProposalTime from "./slides/SlideProposalTime.vue";
import SlideWhatWeCanDo from "./slides/SlideWhatWeCanDo.vue";
import SlideBusiness from "./slides/SlideBusiness.vue";
import SlideFooter from "./slides/SlideFooter.vue";

import ProposalModal from "../proposal/ProposalModal.vue";

const proposalModalOpen = ref(false);

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

  <ProposalModal :open="proposalModalOpen" />
</template>
