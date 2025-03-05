interface User {
  id: number;
  name?: string;
  email?: string;
}

interface AuthResult {
  message: string;
  id: number;
  token: string;
  expireat: string;
}

export const useAuthStore = defineStore("auth", () => {
  const token = ref(useCookie<string | null>("token", { default: () => null }));
  const tokenTimestamp = ref(
    useCookie<string | null>("token_expiration", { default: () => null })
  );

  const isAuthenticated = computed(() => !!token.value);

  function logout() {
    token.value = null;

    console.log("[AUTH] Utilisateur déconnecté");
  }

  return {
    token,
    isAuthenticated,
    logout,
    tokenTimestamp,
  };
});
