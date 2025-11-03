<script setup lang="ts">
const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <Transition appear name="fly">
    <div
      class="flex grow flex-col items-center justify-around sm:items-start sm:gap-y-12"
    >
      <div class="flex flex-col items-center gap-7 sm:items-start">
        <div class="flex flex-col items-center gap-7 sm:flex-row">
          <img
            class="aspect-square h-[39px] w-[39px] grow-0 sm:h-[59px] sm:w-[59px]"
            src="~assets/images/success.png"
            alt="Email has been sent"
          />
          <span class="text-4xl font-semibold sm:text-7xl">Thank you!</span>
        </div>
        <p class="sm:text-2xl">
          Your contacts has been sent and we are <br />
          already preparing the best offer for you.
        </p>
      </div>

      <button
        class="bg-accent text-modalText mx-auto w-fit rounded-full px-12 py-3 text-xl sm:m-0"
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
