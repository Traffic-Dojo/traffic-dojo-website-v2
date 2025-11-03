<script setup lang="ts">
import {
  allArticlesQuery,
  type PreviewArticle,
} from "../../server/utils/sanity/queries";
import { sanityClient } from "../../server/utils/sanity/client";
import { motion, stagger, type VariantType } from "motion-v";

definePageMeta({
  layout: "blog",
});

const currentCategory = ref<string | null>(null);

function onCategoryChange(category: string) {
  if (currentCategory.value === category) {
    currentCategory.value = null;
  } else {
    currentCategory.value = category;
  }
}

const { data: articles } = useAsyncData<PreviewArticle[]>(
  () => sanityClient.fetch(allArticlesQuery),
  {
    default: () => [],
  },
);

const categories = computed(() =>
  articles.value
    ? Array.from(
        new Set(articles.value.map((article) => article.category)).values(),
      )
    : [],
);

const filteredPosts = computed(() =>
  articles.value.filter((article) =>
    currentCategory.value ? article.category === currentCategory.value : true,
  ),
);

// add params.id to links instead of using anchors
// https://nuxt.com/docs/4.x/api/components/nuxt-link

const opacityVariants: Record<string, VariantType> = {
  hidden: {
    y: -10,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};
</script>

<template>
  <motion.div
    initial="hidden"
    while-in-view="visible"
    :in-view-options="{ once: true }"
    :transition="{ duration: 2, delayChildren: stagger(0.4) }"
    class="flex flex-col gap-6"
  >
    <motion.h1 class="text-3xl font-medium" :variants="opacityVariants"
      >Blog</motion.h1
    >

    <!-- Categories -->
    <motion.div
      :variants="opacityVariants"
      class="flex flex-wrap items-center gap-4"
    >
      <motion.button
        v-for="category in categories"
        :key="category"
        :class="[
          'hover:text-accent hover:border-accent cursor-pointer rounded-full border px-4 py-1 text-sm transition-colors duration-500 md:px-10 md:py-2 md:text-base',
          {
            'border-accent text-accent': currentCategory === category,
            'text-gray border-gray': currentCategory !== category,
          },
        ]"
        @click="onCategoryChange(category)"
      >
        {{ category }}
      </motion.button>
    </motion.div>

    <!-- Articles -->
    <motion.div
      class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-8 gap-y-16"
      :variants="opacityVariants"
    >
      <motion.div
        v-for="{
          date,
          category,
          slug,
          title,
          mobile,
          description,
          preview,
        } in filteredPosts"
        :key="title"
        class="flex flex-col gap-4 lg:gap-x-8"
      >
        <picture>
          <source :srcset="preview" media="(min-width: 1024px)" />
          <img
            class="w-full rounded-xl object-contain lg:aspect-square"
            :src="mobile"
            alt="Preview"
          />
        </picture>

        <div class="flex flex-col gap-4">
          <div class="text-gray flex items-center gap-4 font-light">
            <span>{{ new Date(date).toLocaleDateString() }}</span>
            <span>{{ category }}</span>
          </div>

          <NuxtLink
            :to="{ name: 'blog-id', params: { id: slug } }"
            class="hover:text-accent text-lg font-medium transition-colors duration-500"
            >{{ title }}
          </NuxtLink>

          <span class="font-light">{{ description }}</span>
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
</template>
