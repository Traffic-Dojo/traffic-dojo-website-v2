<script setup lang="ts">
import { sanityClient } from "~~/server/utils/sanity/client";
import {
  createArticleQuery,
  type PreviewArticle,
} from "~~/server/utils/sanity/queries";
import { PortableText } from "@portabletext/vue";
import AppLegend from "~/components/AppLegend.vue";
import { motion } from "motion-v";

definePageMeta({
  layout: "blog",
});

const route = useRoute();

const { data } = useAsyncData<PreviewArticle[]>(
  () => sanityClient.fetch(createArticleQuery(route.params.id as string)),
  {
    default: () => [],
  },
);

const article = computed(() => data.value[0]!);

useSeoMeta({
  title: article.value.title,
  ogTitle: article.value.title,
  description: article.value.description,
  ogDescription: article.value.description,
  ogImage: article.value.full,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <motion.div
    initial="initial"
    animate="visible"
    :variants="{ initial: { opacity: 0 }, visible: { opacity: 1 } }"
    :transition="{ delay: 0.4, duration: 2 }"
  >
    <NuxtLink
      href="/blog"
      class="border-gray text-gray mb-8 flex w-fit items-center gap-4 rounded-full border px-10 py-2"
    >
      <span>Back</span>
    </NuxtLink>

    <article
      class="flex flex-col gap-4 md:grid md:grid-cols-[320px_1fr] md:gap-x-10"
    >
      <picture>
        <source :srcset="article.full" media="(min-width: 768px)" />
        <img
          :src="article.mobile"
          :alt="article.title"
          class="rounded-xl md:fixed md:w-xs"
        />
      </picture>

      <div class="flex flex-col gap-4">
        <div class="text-gray flex items-center gap-4">
          <span>{{ new Date(article.date).toLocaleDateString() }}</span>
          <span>{{ article.category }}</span>
        </div>

        <div id="blog">
          <PortableText
            :value="article.content"
            :components="{ types: { image: AppLegend } }"
          />
        </div>
      </div>
    </article>
  </motion.div>
</template>

<style>
@reference './../../assets/css/tailwind.css';

#blog {
  @apply flex flex-col gap-3;

  @media screen and (min-width: 768px) {
    gap: 2rem;
  }
}

#blog h1 {
  font-weight: 500;
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;

  @media screen and (min-width: 640px) {
    font-size: 1.25rem /* 20px */;
    line-height: 1.75rem /* 28px */;
  }

  @media screen and (min-width: 768px) {
    font-size: 1.875rem /* 30px */;
    line-height: 2.25rem /* 36px */;
  }
}

#blog h2 {
  font-weight: 500;
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;

  @media screen and (min-width: 640px) {
    font-size: 1.25rem /* 20px */;
    line-height: 1.75rem /* 28px */;
  }

  @media screen and (min-width: 768px) {
    font-size: 1.875rem /* 30px */;
    line-height: 2.25rem /* 36px */;
  }
}

#blog h3 {
  font-weight: 500;
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;

  @media screen and (min-width: 640px) {
    font-size: 1.25rem /* 20px */;
    line-height: 1.75rem /* 28px */;
  }

  @media screen and (min-width: 768px) {
    font-size: 1.875rem /* 30px */;
    line-height: 2.25rem /* 36px */;
  }
}

#blog h4 {
  font-weight: 500;
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;

  @media screen and (min-width: 640px) {
    font-size: 1.25rem /* 20px */;
    line-height: 1.75rem /* 28px */;
  }

  @media screen and (min-width: 768px) {
    font-size: 1.875rem /* 30px */;
    line-height: 2.25rem /* 36px */;
  }
}

#blog p {
  @apply text-sm;

  @media screen and (min-width: 640px) {
    font-size: 1rem /* 16px */;
    line-height: 1.5rem /* 24px */;
  }

  @media screen and (min-width: 768px) {
    font-size: 1.125rem /* 18px */;
    line-height: 1.75rem /* 28px */;
  }
}

#blog span {
  @apply text-sm;

  @media screen and (min-width: 640px) {
    font-size: 1rem /* 16px */;
    line-height: 1.5rem /* 24px */;
  }

  @media screen and (min-width: 768px) {
    font-size: 1.125rem /* 18px */;
    line-height: 1.75rem /* 28px */;
  }
}

#blog ol {
  @apply text-sm;

  @media screen and (min-width: 640px) {
    font-size: 1rem /* 16px */;
    line-height: 1.5rem /* 24px */;
  }

  @media screen and (min-width: 768px) {
    font-size: 1.125rem /* 18px */;
    line-height: 1.75rem /* 28px */;
  }
}

#blog ul {
  @apply text-sm;

  @media screen and (min-width: 640px) {
    font-size: 1rem /* 16px */;
    line-height: 1.5rem /* 24px */;
  }

  @media screen and (min-width: 768px) {
    font-size: 1.125rem /* 18px */;
    line-height: 1.75rem /* 28px */;
  }
}

#blog ul {
  list-style-type: disc;
  padding-left: 1.25rem;
}

#blog ol {
  list-style-type: decimal;
  padding-left: 1.25rem;
}
</style>
