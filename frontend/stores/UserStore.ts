import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "~/types/User";

export const useUserStore = defineStore("user", () => {
  const user = ref(
    useCookie<User | null>("user_information", { default: () => null })
  );

  return { user };
});
