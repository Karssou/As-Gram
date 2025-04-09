import { get } from "@vueuse/core";

export const useMessage = () => {
  const config = useRuntimeConfig();

  const API_URL = `${config.public.apiBase}/messages`;

  const getMessages = async (conversationId: number) => {
    const request: any = await ApiCall(
      "GET",
      `${API_URL}/get/${conversationId}`,
      {
        limit: 50,
        page: 1,
      }
    );
    return request;
  };

  const sendMessage = async (conversationId: number, content: string) => {
    const request = await ApiCall(
      "POST",
      `${API_URL}/${conversationId}/message/send`,
      { content: content }
    );

    return request;
  };

  const EditMessage = async (messageId: number, NewContent: string) => {
    const request = await ApiCall("PUT", `${API_URL}/${messageId}/edit`, {
      content: NewContent,
    });

    return request;
  };

  const DeleteMessage = async (messageId: number) => {
    const request: any = await ApiCall(
      "DELETE",
      `${API_URL}/${messageId}/delete`
    );
    return request;
  };

  const getMessageReactions = async (messageId: number) => {
    const request: any = await ApiCall("GET", `${API_URL}/${messageId}/react`);

    return request;
  };

  const postMessageReaction = async (
    messageId: number,
    reaction: string,
    userId: number
  ) => {
    const request: any = await ApiCall(
      "POST",
      `${API_URL}/${messageId}/react/${userId}`,
      {
        reaction: reaction,
      }
    );
  };

  return {
    getMessages,
    sendMessage,
    EditMessage,
    DeleteMessage,
    postMessageReaction,
    getMessageReactions,
  };
};
