<script lang="ts" setup>
import { useAppConfig } from "#app";

defineProps<{ size: "small" | "large" }>();

import LinkedInSmall from "./../assets/images/socials/linkedin.svg";
import LinkedInLarge from "./../assets/images/socials/linkedin_full.svg";

import WhatsAppSmall from "./../assets/images/socials/whatsapp.svg";
import WhatsAppLarge from "./../assets/images/socials/whatsapp_full.svg";

const socials = [
  {
    name: "WhatsApp",
    href: "https://wa.me/message/3FKKFYNDVLZ7N1",
    small: WhatsAppSmall,
    large: WhatsAppLarge,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/103803714",
    small: LinkedInSmall,
    large: LinkedInLarge,
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
        <img :src="size === 'small' ? small : large" :alt="name" />
      </a>
    </li>
  </ul>
</template>
