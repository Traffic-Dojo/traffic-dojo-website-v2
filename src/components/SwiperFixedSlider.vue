<script setup lang="ts">
import "swiper/css";

import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as SwiperType } from "swiper";
import { Mousewheel } from "swiper/modules";

defineProps({
  slides: {
    type: Number,
    required: true,
  },
});

const activeSlideIndex = ref(0);

const swiperRef = ref<SwiperType | null>(null);

function onHiddenSwiperChange(swiper: SwiperType) {
  activeSlideIndex.value = swiper.activeIndex;
}

function onSwiper(swiper: SwiperType) {
  swiperRef.value = swiper;
}

function slideToIndex(index: number) {
  if (swiperRef.value) {
    swiperRef.value.slideTo(index);
  }
}

const modules = [Mousewheel];
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
  >
    <slot :activeSlideIndex="activeSlideIndex" :slideToIndex="slideToIndex" />
  </div>

  <Swiper
    class="h-screen w-full"
    direction="vertical"
    :nested="true"
    :modules="modules"
    :mousewheel="{
      sensitivity: 0.1,
      thresholdTime: 100,
      thresholdDelta: 5,
      enabled: true,
    }"
    :speed="800"
    @swiper="onSwiper"
    @slide-change="onHiddenSwiperChange"
  >
    <SwiperSlide
      class="opacity-0"
      v-for="slide in 5"
      :key="slide"
    ></SwiperSlide>
  </Swiper>
</template>
