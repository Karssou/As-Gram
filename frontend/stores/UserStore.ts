export const useUserStore = defineStore("user", () => {
  interface User {
    id: string;
    username: string;
    email: string;
    created_at: string;
    friends: Array<any>;
  }

  const user = ref(
    useCookie<User | null>("user_information", { default: () => null })
  );

  return { user };
});
