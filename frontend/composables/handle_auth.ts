export function HandleAuth() {
  const authstore = useAuthStore();
  const userstore = useUserStore();
  const { addNotification } = useNotificationStore();

  function authenticate(result: any) {
    if (result?.token) {
      authstore.token = result.token;
    } else {
      console.error("[AUTH ERROR] Aucun token reçu !");
    }
  }

  async function login(payload: Record<string, any>) {
    const result: any = await ApiCall("POST", "/login", payload);

    if (result.status === "error") {
      return result;
    } else {
      authenticate(result);
    }
  }

  async function register(payload: Record<string, any>) {
    const result: any = await ApiCall("POST", "/register", payload);
    if (result.status === "error" && result.message) {
      addNotification(result.message, "error");
    } else {
      authenticate(result);
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
