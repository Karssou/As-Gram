import Pusher from "pusher-js";

export const usePusher = () => {
  const API_URL = useRuntimeConfig().public.apiBase;
  const APP_KEY = useRuntimeConfig().public.pusherBase;

  const pusher = new Pusher(APP_KEY, {
    cluster: "eu",
  });

  async function sendTypingEvent(conversationId: number, userId: number) {
    await ApiCall("POST", `${API_URL}/pusher/typing`, {
      conversationId: conversationId,
      userId: userId,
    });
  }

  return { sendTypingEvent, pusher,  };
};
