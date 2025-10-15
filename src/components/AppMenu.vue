<script lang="ts" setup>
import { ref } from "vue";
import { sections } from "../config/sections";
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  VisuallyHidden,
} from "radix-vue";
import { motion, AnimatePresence, stagger, type VariantType } from "motion-v";

const open = ref(false);

function closeMenu() {
  open.value = false;
}

const overlayVariants: Record<string, VariantType> = {
  open: { opacity: 1, transition: { duration: 0.6 } },
  closed: { opacity: 0, transition: { duration: 0.3 } },
};

const listVariants: Record<string, VariantType> = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      ease: "easeIn",
      delayChildren: stagger(0.1),
      duration: 0.25,
    },
  },
  closed: {
    x: -50,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger :as-child="true">
      <button
        class="sm:text-gray sm:border-gray relative px-2 py-2 sm:rounded-full sm:border sm:!px-10"
        :class="{ 'sm:border-white sm:text-white': open }"
      >
        <span class="hidden sm:inline">{{ open ? "Close" : "Menu" }}</span>

        <div class="flex w-[36px] flex-col gap-2 sm:hidden">
          <span
            v-for="(_, index) in 3"
            class="bg-textGray h-[2px] w-full"
            :key="index"
          ></span>
        </div>
      </button>
    </DialogTrigger>
    <DialogPortal forceMount>
      <AnimatePresence>
        <DialogOverlay
          :as="motion.div"
          class="fixed inset-0 z-9999 bg-black/50 backdrop-blur-md"
          initial="closed"
          animate="open"
          exit="closed"
          :variants="overlayVariants"
        />
      </AnimatePresence>
      <AnimatePresence>
        <DialogContent
          :as="motion.div"
          initial="closed"
          animate="open"
          exit="closed"
          class="absolute top-[calc(90px+32px)] left-1/2 z-9999 w-full -translate-x-1/2 px-11 focus:outline-none"
          @click="closeMenu"
        >
          <VisuallyHidden>
            <DialogTitle>Website navigation</DialogTitle>
          </VisuallyHidden>

          <VisuallyHidden>
            <DialogDescription></DialogDescription>
          </VisuallyHidden>

          <nav class="w-fit">
            <motion.ul class="flex flex-col gap-4" :variants="listVariants">
              <motion.li
                v-for="{ label, href } in Object.values(sections)"
                :key="href"
                @click="closeMenu"
                :variants="listVariants"
              >
                <a
                  class="relative text-[28px] before:absolute before:-bottom-1 before:h-[1px] before:w-full before:origin-left before:scale-x-0 before:bg-white before:transition-all before:duration-500 hover:before:scale-x-100 md:text-3xl"
                  :href="href"
                  >{{ label }}</a
                >
              </motion.li>
            </motion.ul>
          </nav>
        </DialogContent>
      </AnimatePresence>
    </DialogPortal>
  </DialogRoot>
</template>
