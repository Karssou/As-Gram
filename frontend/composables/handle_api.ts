export async function ApiCall<T = unknown>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS",
  url: string,
  payload: Record<string, any> = {}
): Promise<T | null> {
  try {
    const authstore = useAuthStore();
    const config = useRuntimeConfig();
    const token = authstore.token;

    return await $fetch<T>(url, {
      baseURL: config.public.apiBase,
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: method !== "GET" && method !== "HEAD" ? payload : undefined,
    });
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.warn("Utilisateur non authentifié. Redirection...");
      return null;
    }
    console.error("[API ERROR]", error);
    return null;
  }
}
