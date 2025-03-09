export const useFriendStore = defineStore("friends", () => {
  const Pending = ref([]) as unknown as Array<{
    [x: string]: any;
    id: number;
    senderId: number;
    receiverId: number;
    status: string;
    createdAt: string;
    created_at: number;
  }>;

  const Received = ref([]) as unknown as Array<{
    [x: string]: any;
    id: number;
    senderId: number;
    receiverId: number;
    status: string;
    createdAt: string;
    created_at: number;
  }>;

  const Friends = ref([]) as unknown as Array<{
    [x: string]: any;
    id: number;
    senderId: number;
    receiverId: number;
    status: string;
    createdAt: string;
    created_at: number;
  }>;

  return {
    Received,
    Friends,
    Pending,
  };
});
