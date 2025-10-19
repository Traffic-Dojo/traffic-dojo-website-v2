<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Transition
    appear
    name="fly"
  >
    <div class="flex flex-col items-center justify-around flex-grow sm:items-start sm:gap-y-12">
      <div class="flex flex-col gap-7 items-center sm:items-start">
        <div class="flex flex-col gap-7 items-center sm:flex-row">
          <img
            class="aspect-square h-[39px] w-[39px] sm:h-[59px] sm:w-[59px] flex-grow-0"
            src="/images/success.png"
            alt="Email has been sent"
          >
          <span class="text-4xl font-semibold sm:text-7xl">Thank you!</span>
        </div>
        <p class="sm:text-2xl">
          Your contacts has been sent and we are <br> already preparing the best offer for you.
        </p>
      </div>

      <button
        class="bg-accent text-modalText rounded-full px-12 py-3 text-xl w-fit mx-auto sm:m-0"
        @click="emit('close')"
      >
        Close
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.fly-enter-active {
  transition: all 0.3s ease;
}

.fly-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
</style>
