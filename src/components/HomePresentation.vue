<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Mousewheel } from "swiper/modules";
import SlideIntroduction from "../slides/SlideIntroduction.vue";
import SlideEnthusiasts from "../slides/SlideEnthusiasts.vue";

import "swiper/css";
import "swiper/css/pagination";

const modules = [Mousewheel];
</script>

<template>
  <Swiper
    direction="vertical"
    class="h-screen !px-4 !py-6"
    :modules="modules"
    :mousewheel="{
      sensitivity: 0.1,
      thresholdTime: 100,
      thresholdDelta: 5,
      enabled: true,
    }"
    :speed="800"
  >
    <SwiperSlide>
      <SlideIntroduction />
    </SwiperSlide>

    <SwiperSlide>
      <SlideEnthusiasts />
    </SwiperSlide>
  </Swiper>
</template>

<style>
.swiper-slide {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
