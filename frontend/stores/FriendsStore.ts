export const useFriendStore = defineStore("friends", () => {
  const friends = ref([]);
  const PendingRequest = ref([]) as unknown as Array<{
    [x: string]: any;
    id: number;
    senderId: number;
    receiverId: number;
    status: string;
    createdAt: string;
    created_at: number;
  }>;
  return {
    friends,
    PendingRequest,
  };
});
