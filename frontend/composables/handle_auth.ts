export function HandleAuth() {
  const authstore = useAuthStore();

  function authenticate(result: any) {
    if (result.token) {
      authstore.token = result.token;
    } else {
      console.error("[AUTH ERROR] Données invalides reçues", result);
    }
  }

  // FONCTION DE LOG-IN
  async function login(payload: Record<string, any>) {
    try {
      const result = await ApiCall("POST", "/login", payload);
      authenticate(result);
      console.log("[LOGIN RESPONSE]", result);
    } catch (error) {
      console.error("[LOGIN ERROR]", error);
      throw error;
    }
  }

  // FONCTION REGISTER
  async function register(payload: Record<string, any>) {
    try {
      const result = await ApiCall("POST", "/register", payload);
      authenticate(result);
    } catch (error) {
      console.error("[REGISTER ERROR]", error);
      throw error;
    }
  }

  return { login, register };
}
