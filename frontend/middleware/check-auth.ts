export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuthStore();
  const { addNotification } = useNotificationStore();

  if (isAuthenticated && to.path === "/authentification") {
    addNotification("Vous êtes déjà connecté !", "error");
    return navigateTo("/");
  }
});
