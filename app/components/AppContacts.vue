<script lang="ts" setup>
const { contacts } = useAppConfig();
const { sendAnalyticsEvent } = useAnalytics();
</script>

<template>
  <div
    class="text-textGray flex w-fit flex-col gap-2 text-center tracking-wide md:text-left md:text-2xl"
  >
    <a
      v-for="{ name, href, event } in contacts"
      :key="name"
      :href="href"
      target="_blank"
      @click="sendAnalyticsEvent(event)"
    >
      {{ name }}
    </a>
  </div>
</template>
