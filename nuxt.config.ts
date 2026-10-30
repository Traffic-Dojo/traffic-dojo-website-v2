import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // The existing Vercel project has Fluid Compute disabled (15s default).
  // A five-job notification batch can await token refresh and Gmail responses.
  nitro: {
    vercel: { functions: { maxDuration: 180 } },
  },
  routeRules: {
    "/": { prerender: true },
    "/blog/**": { prerender: false, ssr: true },
  },

  app: {
    head: {
      title:
        "Traffic Dojo | Digital Marketing & Lead Generation",
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  supabase: {
    redirect: false,
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
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  modules: ["@nuxt/eslint", "nuxt-gtag"],
});
