import { get } from "@vueuse/core";

export const useMessage = () => {
  const config = useRuntimeConfig();
  const API_URL = `${config.public.apiBase}/messages`;

  const getMessages = async (conversationId: number) => {
    const request = ApiCall("GET", `${API_URL}/get/${conversationId}`, {
      limit: 50,
      page: 1,
    });

    return request;
  };

  const sendMessage = async (conversationId: number, content: string) => {
    const request = ApiCall(
      "POST",
      `${API_URL}/${conversationId}/message/send`,
      { content: content }
    );

    return request;
  };

  const EditMessage = async (messageId: number, NewContent: string) => {
    const request = ApiCall("PUT", `${API_URL}/${messageId}/edit`, {
      content: NewContent,
    });

    return request;
  };

  return {
    getMessages,
    sendMessage,
    EditMessage
  };
};
