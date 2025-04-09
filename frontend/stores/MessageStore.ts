export const useMessagesStore = defineStore("messages", () => {
  const messages = ref<Message[]>([]);

  return { messages };
});
