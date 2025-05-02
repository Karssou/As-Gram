export const UseConversation = () => {
  const API_URL = useRuntimeConfig().public.apiBase;

  const createConversation = async (userIds: number[], type: string) => {
    const request = await ApiCall("POST", `/conversation/create`, {
      userIds: userIds,
      type: type,
    });
    return request;
  };

  const deleteConversation = async (conversationId: number) => {
    const request = await ApiCall(
      "DELETE",
      `/conversation/${conversationId}/delete`
    );
    return request;
  };

  const getUserFromConversation = async (conversationId: number) => {
    const request = await ApiCall(
      "GET",
      `/conversation/${conversationId}/users`
    );

    return request;
  };

  const addUserToConversation = async (
    conversationId: number,
    UserId: number
  ) => {
    const request = await ApiCall(
      "POST",
      `/conversation/${conversationId}/users`,
      { userId: UserId }
    );
    return request;
  };

  const isUserInConversation = async (
    conversationId: number,
    userId: number
  ) => {
    const request = await ApiCall(
      "GET",
      `conversation/${conversationId}/users/${userId}`
    );
    return request;
  };

  const deleteUserFromConversation = async (
    conversationId: number,
    userId: number
  ) => {
    const request = await ApiCall(
      "DELETE",
      `/conversation/${conversationId}/users/${userId}`
    );

    return request;
  };

  return {
    createConversation,
    deleteConversation,
    getUserFromConversation,
    addUserToConversation,
    isUserInConversation,
    deleteUserFromConversation,
  };
};
