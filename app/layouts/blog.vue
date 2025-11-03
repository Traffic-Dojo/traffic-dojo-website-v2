<template>
  <div class="flex flex-col">
    <AppHeader :is-fixed="false" />

    <div class="relative z-10 container mx-auto px-8 pt-8 pb-12">
      <slot />
    </div>

    <div class="gradient-blue" />
  </div>
</template>

<style scoped>
.gradient-blue {
  pointer-events: none;

  --size: max(2000px, 100svw);

  --initX: -25%;
  --initY: -25%;

  width: var(--size);
  height: var(--size);

  position: fixed;
  top: 50%;
  left: 50%;

  transform: translateX(var(--initX)) translateY(var(--initY)) scale(1);
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgb(17, 96, 251) 0%,
    transparent
  );
}
</style>
