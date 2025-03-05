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

  const isAuthenticated = computed(() => !!token);

  async function api(
    method: string,
    url: string,
    payload: Record<string, any> = {}
  ) {
    const response = await fetch(`http://localhost:3333${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: method !== "GET" ? JSON.stringify(payload) : null,
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    return response.json();
  }

  function authenticate(result: AuthResult) {
    const authHeader = useRequestHeader("authorization");
    console.log(authHeader);
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token.value = authHeader.replace("Bearer ", ""); // Stockage du token sans "Bearer "
    } else {
      console.error("[AUTH ERROR] Aucun token reçu dans le header.");
    }
    tokenTimestamp.value = result.expireat;
  }

  async function login(payload: Record<string, any>) {
    try {
      const result = await api("POST", "/login", payload);
      authenticate(result);
      console.log("[LOGIN RESPONSE]", result);
    } catch (error) {
      console.error("[LOGIN ERROR]", error);
      throw error;
    }
  }

  async function register(payload: Record<string, any>) {
    try {
      const result = await api("POST", "/register", payload);
      authenticate(result);
    } catch (error) {
      console.error("[REGISTER ERROR]", error);
      throw error;
    }
  }

  function logout() {
    token.value = null;
    console.log("[AUTH] Utilisateur déconnecté");
  }

  async function me() {
    const request = await api("GET", "/me");
    return request;
  }

  async function salut() {
    const request = await api("GET", "/salut");
    console.log(request);
    return request;
  }

  return {
    token,
    isAuthenticated,
    login,
    register,
    logout,
    tokenTimestamp,
    me,
    salut,
  };
});
