<script setup lang="ts">
import type { PortableTextComponentProps } from "@portabletext/vue";
import { sanityImageBuilder } from "~~/server/utils/sanity/image";

const props = defineProps<
  PortableTextComponentProps<{
    caption: string;
  }>
>();

const imgSrc = sanityImageBuilder.image(props.value).url();
</script>

<template>
  <figure
    v-if="value.caption"
    class="flex flex-col items-center gap-4 text-center"
  >
    <img class="rounded-xl" :src="imgSrc" :alt="value.caption" />

    <figcaption>{{ value.caption }}</figcaption>
  </figure>

  <img v-else class="rounded-xl" :src="imgSrc" alt="Article related image" />
</template>
