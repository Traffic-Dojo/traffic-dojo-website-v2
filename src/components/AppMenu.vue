<script lang="ts" setup>
import { sections } from "../config/sections";
import { motion, stagger, type VariantType } from "motion-v";
import AppModal from "./AppModal.vue";

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
  <AppModal
    variant="fullscreen"
    :title="{ hidden: true, label: 'Navigation modal' }"
    :description="{
      hidden: true,
      label: 'Navigation through all slides of main page',
    }"
    :with-close="false"
  >
    <template #trigger="{ open }">
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
    </template>

    <template #content="{ closeModal }">
      <nav class="w-fit">
        <motion.ul class="flex flex-col gap-4" :variants="listVariants">
          <motion.li
            v-for="{ label, href } in Object.values(sections)"
            :key="href"
            :variants="listVariants"
            @click="closeModal"
          >
            <a
              class="relative text-[28px] before:absolute before:-bottom-1 before:h-[1px] before:w-full before:origin-left before:scale-x-0 before:bg-white before:transition-all before:duration-500 hover:before:scale-x-100 md:text-3xl"
              :href="href"
              >{{ label }}</a
            >
          </motion.li>
        </motion.ul>
      </nav>
    </template>
  </AppModal>
</template>
