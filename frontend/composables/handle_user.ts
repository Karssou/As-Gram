export function HandleUser() {
  const userstore = useUserStore();

  async function fetchUserInformations() {
    try {
      const user = await ApiCall("GET", "/me");
      return user;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur", error);
    }
  }

  return { fetchUserInformations };
}
