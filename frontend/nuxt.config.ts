// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3333",
    },
  },
  modules: [
    "@pinia/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Lato: {
            wght: [400, 700],
            ital: [400, 700],
            regular: [400, 700],
          },
          Opensans: { wght: [400, 600], ital: [400, 600] },
          Ubuntu: { wght: [400, 500] },
          Montserrat: {
            wght: [400, 900],
          },
        },
      },
    ],
    "@nuxt/icon",
  ],

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    "@/assets/styles/main.scss",
    "@/assets/styles/variables.scss",
    "@/assets/styles/reset.scss",
    "@/assets/fonts/fonts.css",
  ],
  googleFonts: {
    useStylesheet: true,
    preload: true,
    preconnect: true,
    prefetch: true,
    overwriting: true,
    outputDir: "assets/fonts",
    fontsDir: "assets/fonts",
    stylePath: "fonts.css",
  },
});
