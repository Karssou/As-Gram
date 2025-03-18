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
    if (error?.response) {
      if (
        error.response?.status === 401 &&
        error.response._data.status === "error"
      ) {
        console.warn("Accès refusé, redirection vers le login...");
        navigateTo("/authentification");
        return { status: "error", message: "Veuillez vous connectez..." };
      }
      if (error.response?._data) {
        return error.response._data;
      }
    }
  }
}
