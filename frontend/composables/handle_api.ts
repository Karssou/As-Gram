export async function ApiCall<T = unknown>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS",
  url: string,
  payload: Record<string, any> = {}
): Promise<T | { error: string; message?: string }> {
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
      if (error.response?._data) {
        return error.response._data;
      }
    }
  }
}
