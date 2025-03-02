// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/google-fonts", "@nuxt/icon"],

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    "@/assets/styles/main.scss",
    "@/assets/styles/variables.scss",
    "@/assets/styles/fonts.scss",
    "@/assets/styles/reset.scss",
  ],
  googleFonts: {
    useStylesheet: true,
    preload: true,
    preconnect: true,
    prefetch: true,
  },
});
