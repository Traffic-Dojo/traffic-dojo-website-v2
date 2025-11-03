<script setup lang="ts">
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as SwiperType } from "swiper";
import { useAppConfig } from "#app";

const { initialSwiperConfig } = useAppConfig();

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
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
  >
    <slot
      :active-slide-index="activeSlideIndex"
      :slide-to-index="slideToIndex"
    />
  </div>

  <Swiper
    :nested="true"
    class="h-screen"
    v-bind="initialSwiperConfig"
    @swiper="onSwiper"
    @slide-change="onHiddenSwiperChange"
  >
    <SwiperSlide v-for="slide in slides" :key="slide" class="opacity-0" />
  </Swiper>
</template>
