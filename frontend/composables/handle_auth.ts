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
      if (result.message) {
        addNotification(result.message, result.status);
      }
    } else {
      if (result.message) {
        addNotification(result.message, result.status);
      }
      authenticate(result);
    }
  }

  async function register(payload: Record<string, any>) {
    const result: any = await ApiCall("POST", "/register", payload);
    if (result.status === "error") {
      addNotification(result.message, "error");
    } else {
      authenticate(result);
    }
  }

  async function logout() {
    const result: any = ApiCall("DELETE", "/logout");

    if (result.status === "error") {
      addNotification(result.message, "error");
    } else {
      addNotification(result.message, "success");

      authstore.token = null;
      userstore.user = null;
    }
  }

  return { login, register, logout };
}
