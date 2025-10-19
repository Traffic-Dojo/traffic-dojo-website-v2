<script lang="ts" setup>
const badges = [
  {
    name: "DesignRush",
    href: "https://www.designrush.com/agency/profile/traffic-dojo",
    src: "/images/verified.png",
    alt: "Traffic Dojo is verified on DesignRush",
  },
];
</script>

<template>
  <div class="flex justify-center gap-4">
    <a
      v-for="{ name, href, src, alt } in badges"
      :key="name"
      target="_blank"
      :href="href"
    >
      <img class="h-full max-h-[70px] md:max-h-[90px]" :src="src" :alt="alt" />
    </a>
  </div>
</template>
