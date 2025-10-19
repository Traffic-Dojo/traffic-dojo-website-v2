<script lang="ts" setup>
import IconPlay from "./icons/IconPlay.vue";
import { motion } from "motion-v";

defineEmits({
  click: null,
});
</script>

<template>
  <motion.button
    ref="buttonRef"
    class="relative col-span-2 flex cursor-pointer items-center gap-7 justify-self-center rounded-full px-8 py-3 text-2xl font-medium"
    @click="$emit('click')"
  >
    <span>Start your path</span>
    <IconPlay />
  </motion.button>
</template>

<style scoped>
button {
  transition: box-shadow 500ms ease-in-out;
  box-shadow:
    -19.3px 19.3px 19.3px 0px rgba(255, 255, 255, 0.1) inset,
    19.3px -19.3px 19.3px 0px rgba(164, 163, 163, 0.1) inset;
}

button:hover {
  box-shadow:
    -14.43px 14.43px 14.43px 0px rgba(255, 255, 255, 0.1) inset,
    14.43px -14.43px 14.43px 0px rgba(164, 163, 163, 0.1) inset,
    0px 0px 28.05px 0px rgba(65, 114, 239, 1);
}

button::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  background: linear-gradient(
      122.83deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    )
    border-box;
  background-size: 400% 400%;
  mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  border-radius: 9999px;

  animation: gradientAnimation ease-in-out 5s infinite backwards;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 80% 50%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>
