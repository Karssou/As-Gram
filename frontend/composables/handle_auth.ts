export function HandleAuth() {
  const authstore = useAuthStore();
  const userstore = useUserStore();
  const { addNotification, removeNotification } = useNotificationStore();

  function authenticate(result: any) {
    if (result?.token) {
      authstore.token = result.token;
    } else {
      console.error("[AUTH ERROR] Aucun token reçu !");
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

  async function salut() {
    try {
      const request = await ApiCall("GET", "/salut");
      return request;
    } catch (error: any) {
      addNotification(error, "error");
    }
  }

  async function logout() {
    const request = ApiCall("DELETE", "/logout");
    authstore.token = null;
    userstore.user = null;
    return request;
  }

  return { login, register, salut, logout };
}
