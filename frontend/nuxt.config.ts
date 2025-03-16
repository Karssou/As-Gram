// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  modules: ["@pinia/nuxt", "@nuxtjs/google-fonts", "@nuxt/icon"],

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    "@/assets/styles/main.scss",
    "@/assets/styles/reset.scss",
    "@/assets/fonts/fonts.css",
  ],
});
