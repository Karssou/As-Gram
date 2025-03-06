export const useAuthStore = defineStore("auth", () => {
  const token = ref(useCookie<string | null>("token", { default: () => null }));

  const isAuthenticated = computed(() => !!token.value);
  return {
    token,
    isAuthenticated,
  };
});
