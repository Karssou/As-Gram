export function HandleUser() {
  const userstore = useUserStore();

  async function fetchUserInformations() {
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

  return { fetchUserInformations, updateUserInformations };
}
