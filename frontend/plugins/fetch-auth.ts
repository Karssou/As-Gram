export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:error", (error: any) => {
    if (error.response?.status === 401) {
      console.warn("⛔ Accès refusé, redirection vers login...");
      navigateTo("/login");
    }
  });
});
