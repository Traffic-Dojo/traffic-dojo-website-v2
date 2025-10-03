<script setup lang="ts">
import SwipesContainer from './SwipesContainer.vue'

const slides = ['A', 'B', ['C1', 'C2', 'C3'], 'D', 'E']
</script>

<template>
  <SwipesContainer :slides="slides" />
</template>

<style scoped>
.slide {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>
