import tailwindcss from "@tailwindcss/vite";

// TODO:
// - add SSG to index page

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

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
});
