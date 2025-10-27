<script setup lang="ts">
const route = useRoute();

/**
 * TODO:
 * 1. fetch articles based on route.params.id
 * 2. fix styles
 * 3. vue markdown component
 */
</script>

<template>
  <div class="flex h-[90px] items-center">
    <Button
      href="/blog"
      class="border-textGray text-textGray mb-8 flex w-fit items-center gap-4 rounded-full border px-8"
    >
      <span>Back</span>
    </Button>
  </div>

  <article
    class="mx-auto flex h-[calc(100svh-270px)] max-w-5xl flex-col gap-4 overflow-y-auto"
  >
    <div class="flex flex-col gap-4 md:flex-row md:gap-x-10">
      <picture class="shrink-0 md:w-full md:max-w-[247px]">
        <!-- <source srcset="{full}" media="(min-width: 768px)" /> -->
        <!-- <img
          src="{mobile}"
          alt="Thumbnail"
          class="rounded-xl md:fixed md:w-full md:max-w-xs"
        /> -->
      </picture>

      <div class="flex flex-col gap-4">
        <div class="text-textGray flex items-center gap-4">
          <span>{new Date(date).toLocaleDateString()}</span>
          <span>{category}</span>
        </div>

        <div id="blog">
          <!-- TODO: add markdown component -->
          <!-- <PortableText
					value={content}
					components={{
						types: {
							image: Legend
						}
					}}
				/> -->
        </div>
      </div>
    </div>
  </article>
</template>

<style>
@reference './../../assets/css/tailwind.css';

#blog {
  @apply flex flex-col gap-3;

  @media screen and (min-width: 768px) {
    gap: 2rem;
  }
}

#blog :global(h1) {
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

#blog :global(h2) {
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

#blog :global(h3) {
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

#blog :global(p) {
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

#blog :global(span) {
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

#blog :global(ol) {
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

#blog :global(ul) {
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

#blog :global(ul) {
  list-style-type: disc;
  padding-left: 1.25rem;
}

#blog :global(ol) {
  list-style-type: decimal;
  padding-left: 1.25rem;
}
</style>
