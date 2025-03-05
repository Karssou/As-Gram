export function HandleAuth() {
  const authstore = useAuthStore();

  function authenticate(result: any) {
    authstore.token = result.token;
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
    const request = await ApiCall("GET", "/salut");
    console.log(request);
    return request;
  }

  async function logout() {
    const request = ApiCall("DELETE", "/logout");
    authstore.token = null;
    return request;
  }

  return { login, register, salut, logout };
}
