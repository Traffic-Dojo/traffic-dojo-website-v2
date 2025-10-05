<script lang="ts" setup>
import { twMerge } from "tailwind-merge";
import { SwiperSlide } from "swiper/vue";

defineProps({
  className: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <SwiperSlide class="h-screen">
    <div class="absolute inset-0 -z-10">
      <slot name="gradients" />
    </div>

    <section :class="twMerge('h-full', className)">
      <slot />
    </section>
  </SwiperSlide>
</template>
