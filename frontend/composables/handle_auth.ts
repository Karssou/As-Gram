export function HandleAuth() {
  const authstore = useAuthStore();
  const userstore = useUserStore();
  const { addNotification } = useNotificationStore();

  function authenticate(result: any) {
    if (result?.token) {
      authstore.token = result.token.token;
    }

    if (result?.user) {
      userstore.user = result.user;
    }
  }

  async function login(payload: Record<string, any>) {
    const result: any = await ApiCall("POST", "auth/login", payload);

    authenticate(result);
  }

  async function register(payload: Record<string, any>) {
    const request: any = await ApiCall("POST", "auth/register", payload);

    authenticate(request);
  }

  async function logout() {
    await ApiCall("DELETE", "auth/logout");

    if (authstore.token) {
      authstore.token = null;
    }

    if (userstore.user) {
      userstore.user = null;
    }
  }

  return { login, register, logout };
}
