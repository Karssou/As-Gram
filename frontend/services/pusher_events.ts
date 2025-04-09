const API_URL = useRuntimeConfig().public.apiBase;

export async function sendTypingEvent(conversationId: number, userId: number) {
  await ApiCall("POST", `${API_URL}/pusher/typing`, {
    conversationId: conversationId,
    userId: userId,
  }); 
}
