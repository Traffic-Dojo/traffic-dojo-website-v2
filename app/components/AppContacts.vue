<script lang="ts" setup>
const contacts = [
  {
    name: "info@traffic-dojo.com",
    href: "mailto:info@traffic-dojo.com",
    event: "Contacts_Email",
  },
  {
    name: "+1 (646) 917-8329",
    href: "tel:+1 (646) 917-8329",
    event: "Contacts_Telephone",
  },
];
</script>

<template>
  <div
    class="text-textGray flex w-fit flex-col gap-2 text-center tracking-wide md:text-left md:text-2xl"
  >
    <a
      @click="console.log('analytics', event)"
      v-for="{ name, href, event } in contacts"
      :key="name"
      :href="href"
      target="_blank"
    >
      {{ name }}
    </a>
  </div>
</template>
