// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: false,
  devtools: { enabled: true },
  css: [
    "@/assets/styles/main.scss",
    "@/assets/styles/variables.scss",
    "@/assets/styles/fonts.scss",
    "@/assets/styles/reset.scss",
  ],
  modules: ["@pinia/nuxt"],
});
