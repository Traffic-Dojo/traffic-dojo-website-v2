import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  routeRules: {
    "/": { prerender: true },
    "/blog/**": { prerender: false, ssr: true },
  },

  app: {
    head: {
      title:
        "Traffic Dojo - Digital Marketing agency and Lead Generation Services",
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  css: ["~/assets/css/tailwind.css", "~/assets/css/fonts.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  gtag: {
    enabled: process.env.NODE_ENV === "production",
    id: "G-0CEC8EKLH8",
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "nuxt-gtag"],
});
