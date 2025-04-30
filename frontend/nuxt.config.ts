// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      pusherBase: process.env.app_key,
    },
  },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxt/icon",
    "@nuxt/fonts",
    "nuxt-socket-io",
  ],

  googleFonts: {
    families: {
      Roboto: true,
      Inter: "200..700",
      Mulish: "200..600",
    },
  },

  io: {
    sockets: [
      {
        name: "message",
        url: "http://localhost:3333",
      },
    ],
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    "@/assets/styles/main.scss",
    "@/assets/styles/reset.scss",
    "@/assets/fonts/fonts.css",
  ],
});
