export async function ApiCall<T = unknown>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS",
  url: string,
  payload: Record<string, any> = {}
): Promise<T | { status: string; message: string } | undefined> {
  const authstore = useAuthStore();
  const config = useRuntimeConfig();
  const token = authstore.token;
  try {
    const response = await $fetch<T>(url, {
      baseURL: config.public.apiBase,
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
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
