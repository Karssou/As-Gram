export const useFriendStore = defineStore("friends", () => {
  interface FriendRequest {
    id: number;
    senderId: number;
    receiverId: number;
    status: string;
    created_at: number;
    username: string;
    CreatedAt: number;
    userId: number;
  }

  const Pending = ref<FriendRequest[]>([]);
  const Received = ref<FriendRequest[]>([]);
  const Friends = ref<FriendRequest[]>([]);

  return {
    Received,
    Friends,
    Pending,
  };
});
