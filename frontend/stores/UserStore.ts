import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  interface User {
    username: string;
    fullName: string;
    biography: string;
    gender: string;
    birthdate: string;
    email: string;
    publications: number;
    followers: string;
    following: number;
  }

  // Valeurs par défaut
  const user = ref<User>({
    username: "a",
    fullName: "",
    biography: "",
    gender: "",
    birthdate: "",
    email: "",
    publications: 0,
    followers: "1M",
    following: 0,
  });

  function updateUser(data: Partial<User>) {
    user.value = { ...user.value, ...data };
  }

  return { user, updateUser };
});
