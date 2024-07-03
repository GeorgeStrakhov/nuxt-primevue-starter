import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  app: {
    head: {
      title: "Nuxt App",
    },
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  devtools: { enabled: true },

  css: [
    "@/assets/main.css",
    "primeicons/primeicons.css",
  ],

  modules: ["@primevue/nuxt-module"],

  primevue: {
    options: {
      theme: {
        preset: Aura
      },
      ripple: true
    },
    autoImport: true
  },

  compatibilityDate: "2024-07-03"
});
