<script setup lang="ts">
import { useMotionValueEvent, useScroll } from 'motion-v'
import { ref } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    required: true,
  },
  inner: {
    type: Boolean,
    required: false,
    default: false,
  },
  depth: {
    type: Number,
    required: false,
    default: 0,
  },
})

const container = ref<HTMLElement | null>(null)
const currentSlide = ref(0)

const { scrollYProgress } = useScroll({ container })

useMotionValueEvent(scrollYProgress, 'change', (value) => {
  currentSlide.value = Math.round(value * (props.slides.length - 1))
})
</script>

<template>
  <div ref="container" class="container" :class="{ innerContainer: depth > 0 }">
    <template v-for="(slide, index) in slides" :key="index">
      <swipes-container v-if="Array.isArray(slide)" :slides="slide" :depth="depth + 1" />

      <div v-else :key="index" class="slide">
        <span>{{ slide }}</span>
        <button @click="console.log(slide)">Click</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  scroll-snap-type: y mandatory;
  background-color: antiquewhite;
  overflow-y: scroll;
  scroll-snap-align: center;
  scroll-snap-type: y mandatory;
}

/* .content {
  position: fixed;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
} */

/* .content :deep(*) {
  pointer-events: all;
} */

.slide {
  scroll-snap-align: center;
  scroll-snap-stop: always;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.innerContainer::-webkit-scrollbar {
  display: none;
}
</style>
