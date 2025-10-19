<script setup lang="ts">
defineEmits({
  inputEnter: null,
  inputLeave: null,
});
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <img
      src="~assets/images/bell.png"
      alt="Bell"
      class="aspect-square h-[58px] md:h-auto md:max-w-[152px]"
    />

    <div class="flex max-w-[280px] flex-col items-center gap-4 md:max-w-full">
      <p
        class="max-w-[400px] text-center text-base font-normal tracking-wide md:text-xl"
      >
        Get access to exclusive digital marketing tips and case studies by
        subscribing to our emails
      </p>

      <form
        class="flex w-full max-w-[200px] flex-col items-center gap-4 md:max-w-full"
        method="POST"
      >
        <input
          type="email"
          @mouseenter="$emit('inputEnter')"
          @mouseleave="$emit('inputLeave')"
          placeholder="Enter your email"
          class="text-textLight placeholder:text-textGray border-textGray max-w-[220px] rounded-none border-b-[1px] border-l-0 border-r-0 border-t-0 !bg-transparent px-2 py-2 placeholder:text-center autofill:!bg-transparent md:text-lg md:tracking-wider md:placeholder:text-left"
        />

        <button
          type="submit"
          class="bg-accent rounded-full px-8 py-2 text-xl font-medium"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>
</template>
