import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  routeRules: {
    "/": { prerender: true },
    "/blog/**": { prerender: false },
  },

  imports: {
    autoImport: false,
  },

  future: {
    compatibilityVersion: 4,
  },

  css: ["~/assets/css/tailwind.css", "~/assets/css/fonts.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },
});
