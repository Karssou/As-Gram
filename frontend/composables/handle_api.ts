export async function ApiCall<T = unknown>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS",
  url: string,
  payload: Record<string, any> = {},
  type: string | false = "application/json"
): Promise<T | { status: string; message: string } | undefined> {
  const authstore = useAuthStore();
  const config = useRuntimeConfig();
  const token = authstore.token;
  const headers: Record<string, string> = {};
  if (type) headers["Content-Type"] = type;
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const response = await $fetch<T>(url, {
      baseURL: config.public.apiBase,
      method,
      headers,
      body: method !== "GET" && method !== "HEAD" ? payload : undefined,
    });

    return response;
  } catch (error: any) {
    console.error("Erreur API :", error);

    if (error?.response) {
      const { status, _data } = error.response;

      if (status === 401 && _data?.status === "error") {
        console.warn("Accès refusé, redirection vers la connexion...");
        navigateTo("/authentification");
        return Promise.reject({
          status: "error",
          message: "Veuillez vous connecter...",
        });
      }

      return Promise.reject(
        _data || { status: "error", message: "Une erreur est survenue." }
      );
    }

    return Promise.reject({
      status: "error",
      message: "Erreur inconnue, vérifiez votre connexion.",
    });
  }
}
