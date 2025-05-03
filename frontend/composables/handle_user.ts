import type { User } from "~/types/User";

export function HandleUser() {
  const userstore = useUserStore();
  const API_URL = `${useRuntimeConfig().public.apiBase}/user`;

  async function fetchMyInformations() {
    try {
      const request: any = await ApiCall("GET", "user/me");
      if (request.user) {
        userstore.user = request.user;
        return request;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur", error);
    }
  }

  async function updateUserInformations(payload: any) {
    console.log(payload);
    const request: any = await ApiCall(
      "PATCH",
      "/user/update-information",
      payload
    );
  }

  const fetchUserInformations = async (userId: number): Promise<User> => {
    const request: any = await ApiCall("GET", `${API_URL}/get/${userId}`);
    return request;
  };

  return { fetchMyInformations, updateUserInformations, fetchUserInformations };
}
