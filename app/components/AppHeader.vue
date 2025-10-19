<script lang="ts" setup>
import AppMenu from "./AppMenu.vue";
import AppSocials from "./AppSocials.vue";
import { motion } from "motion-v";

const consult_link =
  "https://calendly.com/d/ckmp-37t-5g8/traffic-dojo-free-consultation";
</script>

<template>
  <motion.header
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 3 }"
    class="paddings fixed top-0 left-1/2 z-50 flex h-[90px] w-full max-w-7xl -translate-x-1/2 items-center justify-between px-8"
  >
    <AppMenu />

    <nav class="flex items-center gap-9">
      <AppSocials size="small" />

      <ul class="flex items-baseline gap-[14px] tracking-wide">
        <li>
          <button
            class="bg-accent cursor-pointer rounded-full px-6 py-2 text-[15px] font-medium whitespace-nowrap shadow-[0px_0px_20.16px_0px_rgba(255,168,0,0.3)]"
          >
            Proposal request
          </button>
        </li>

        <li class="hidden sm:inline">
          <a
            target="_blank"
            :href="consult_link"
            class="rounded-full bg-white px-6 py-2 text-sm leading-none whitespace-nowrap text-black"
          >
            Schedule a Call
          </a>
        </li>
      </ul>
    </nav>
  </motion.header>
</template>
