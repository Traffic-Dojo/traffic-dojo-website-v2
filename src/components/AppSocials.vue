<script lang="ts" setup>
defineProps<{ size: "small" | "large" }>();

const socials = [
  {
    name: "WhatsApp",
    href: "https://wa.me/message/3FKKFYNDVLZ7N1",
    small: "/icons/linkedin.svg",
    large: "/icons/linkedin_full.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/103803714",
    small: "/icons/whatsapp.svg",
    large: "/icons/whatsapp_full.svg",
  },
];
</script>

<template>
  <ul
    class="flex items-center justify-end gap-[16px] md:gap-[18px] [&_svg]:aspect-square [&_svg]:h-[42px] [&_svg]:md:h-[72px]"
    :class="{ 'hidden sm:flex': size === 'small' }"
  >
    <li v-for="{ name, href, small, large } in socials" :key="name">
      <a :href="href" target="_blank" class="rounded-sm p-1">
        <img :src="size === 'small' ? small : large" alt="name" />
      </a>
    </li>
  </ul>
</template>
