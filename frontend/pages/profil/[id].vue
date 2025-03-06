<script lang="ts" setup>
const { fetchUserInformations } = HandleUser();
import { onMounted } from "vue";

const userstore = useUserStore();

onMounted(async () => {
  if (!userstore.user) {
    try {
      const response: any = await fetchUserInformations();
      const userdata = response?.user;
      if (userdata) {
        userstore.user = userdata;
      }
    } catch (error) {
      console.log("Erreur de la récup");
    }
  }
});

interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
  friends: Array<any>;
}
const user = computed(() => userstore.user || null);
</script>

<template>
  <div id="page-content">
    <div id="content">
      <h1>Profil de {{ user?.username || "Username Non Accessible" }}</h1>

      <h1>Création le : {{}}</h1>

      <h1>Amis :</h1>

      <h1>Email : {{ user?.email }}</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "styles/profil.scss";
</style>
