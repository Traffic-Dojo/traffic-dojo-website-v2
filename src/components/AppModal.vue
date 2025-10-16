<script lang="ts" setup>
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  VisuallyHidden,
} from "radix-vue";

import { motion, AnimatePresence, type VariantType } from "motion-v";
import { Icon } from "@iconify/vue";
import { twMerge } from "tailwind-merge";
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    title: { hidden: boolean; label: string };
    description: { hidden: boolean; label: string };
    withClose?: boolean;
    contentClassName?: string;
    overlayClassName?: string;
    variant: "center" | "fullscreen";
  }>(),
  { withClose: true, variant: "center" },
);

const overlayVariants: Record<string, VariantType> = {
  open: { opacity: 1, transition: { duration: 0.6 } },
  closed: { opacity: 0, transition: { duration: 0.3 } },
};

const contentVariants: Record<string, VariantType> = {
  open: { opacity: 1, transition: { duration: 0.6 } },
  closed: { opacity: 0, transition: { duration: 0.3 } },
};

const contentStyleVariants = {
  center:
    "text-black-modal absolute top-[50%] left-[50%] z-[100] mx-4 max-h-[85vh] w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-4xl bg-white p-[25px] px-11 py-10 focus:outline-none sm:mx-0",
  fullscreen:
    "absolute top-[calc(90px+32px)] left-1/2 w-full max-w-7xl -translate-x-1/2 px-11 focus:outline-none bg-transparent text-white",
} as const;

const open = ref(false);

function closeModal() {
  open.value = false;
}
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger :as-child="true">
      <slot name="trigger" :open />
    </DialogTrigger>

    <DialogPortal forceMount>
      <AnimatePresence>
        <DialogOverlay
          :as="motion.div"
          :class="
            twMerge(
              'fixed inset-0 z-100 bg-black/50 backdrop-blur-sm',
              overlayClassName,
            )
          "
          initial="closed"
          animate="open"
          exit="closed"
          :variants="overlayVariants"
        />
      </AnimatePresence>
      <AnimatePresence>
        <DialogContent
          :as="motion.div"
          :variants="contentVariants"
          initial="closed"
          animate="open"
          exit="closed"
          :class="
            twMerge(
              'z-[100]',
              contentStyleVariants[props.variant],
              contentClassName,
            )
          "
        >
          <VisuallyHidden v-if="title.hidden">
            <DialogTitle>{{ title.label }}</DialogTitle>
          </VisuallyHidden>

          <DialogTitle v-else>{{ title.label }}</DialogTitle>

          <VisuallyHidden v-if="description.hidden">
            <DialogDescription>{{ description.label }}</DialogDescription>
          </VisuallyHidden>

          <DialogDescription v-else>{{ description.label }}</DialogDescription>

          <slot name="content" :open :closeModal />

          <DialogClose
            v-if="withClose"
            class="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-black focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Icon icon="lucide:x" />
          </DialogClose>
        </DialogContent>
      </AnimatePresence>
    </DialogPortal>
  </DialogRoot>
</template>
