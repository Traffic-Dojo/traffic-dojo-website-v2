<script setup lang="ts">
import { inView, type ElementOrSelector } from 'motion-v'
import { onMounted, ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: 'Slide',
  },
})

const slideRef = ref<ElementOrSelector>()

onMounted(() => {
  if (!slideRef.value) return

  inView(slideRef.value, () => {
    console.log(`slide '${props.name}' is inview'`)
  })
})
</script>

<template>
  <div class="slide" ref="slideRef">
    <slot>
      <span>{{ name }}</span>
    </slot>
  </div>
</template>

<style scoped>
.slide {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: beige;
}
</style>
