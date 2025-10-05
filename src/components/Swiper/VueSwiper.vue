<script setup lang="ts">
import 'swiper/css'
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperType } from 'swiper'

defineProps({
  slides: {
    type: Number,
    required: true,
  },
})

const activeIndex = ref(0)

function onInnerSwiperSlideChange(swiper: SwiperType) {
  activeIndex.value = swiper.activeIndex
}
</script>

<template>
  <Swiper direction="vertical" :cssMode="true">
    <SwiperSlide class="centered">A</SwiperSlide>
    <SwiperSlide class="centered">B</SwiperSlide>

    <SwiperSlide class="full-height">
      <div class="content">
        <span>ActiveIndex: {{ activeIndex }}</span>
      </div>

      <Swiper
        class="swiper-hidden"
        direction="vertical"
        :cssMode="true"
        :nested="true"
        @slide-change="onInnerSwiperSlideChange"
      >
        <SwiperSlide v-for="slide in slides" :key="slide" class="hidden"></SwiperSlide>
      </Swiper>
    </SwiperSlide>

    <SwiperSlide>D</SwiperSlide>
  </Swiper>
</template>

<style scoped>
.swiper {
  height: 100vh;
  width: 100%;
}

.hidden {
  opacity: 0;
}

.content {
  position: absolute;
  z-index: 1;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.content :deep(span) {
  pointer-events: all;
}

.full-height {
  height: 100%;
}

.swiper-slide {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
