import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  interface User {
    id: number;
    username: string;
    fullName: string;
    biography: string;
    gender: string;
    birthdate: string | Date | "";
  }

  const user = ref(
    useCookie<User | null>("user_information", { default: () => null })
  );

  return { user };
});
