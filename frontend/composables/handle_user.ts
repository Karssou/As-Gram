export function HandleUser() {
  const { user } = useUserStore();

  async function fetchUserInformations() {
    try {
      const request = await ApiCall("GET", "user/me");
      return request;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur", error);
    }
  }

  async function updateUserInformations(payload: any) {
    const request: any = await ApiCall(
      "PATCH",
      "/user/update-information",
      payload
    );

    if (request.status === "error") {
      console.log("PROBLEME AVEC LE UPDATE");
    }
  }

  return { fetchUserInformations, updateUserInformations };
}
