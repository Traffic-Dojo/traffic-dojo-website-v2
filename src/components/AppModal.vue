<script lang="ts" setup>
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
} from "radix-vue";
import { Icon } from "@iconify/vue";

const open = defineModel("open", { type: Boolean });

function onCloseModal() {
  open.value = false;
}
</script>

<template>
  <DialogRoot :open="open">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-30 bg-black/50" />
      <DialogContent
        class="text-black-modal fixed top-[50%] left-[50%] z-[100] mx-4 max-h-[85vh] w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-4xl bg-white p-[25px] px-11 py-10 focus:outline-none sm:mx-0"
      >
        <slot />

        <DialogClose
          class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
          aria-label="Close"
          @click="onCloseModal"
        >
          <Icon icon="lucide:x" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
