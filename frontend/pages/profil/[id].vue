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
  fullName: string;
}
const user = computed(() => userstore.user || null);
</script>

<template>
  <div id="page-content">
    <div id="panel-gestion-user">
      <div id="header-panel">
        <h1>{{ user?.username }}</h1>
      </div>
      <div id="content-panel">
        <form @submit.prevent="" id="form-content-panel">
          <label for="full-name"> Nom Complet :</label>
          <input
            type="text"
            id="full-name"
            class="input-panel-gestion"
            placeholder="Votre nom Complet"
          />

          <label for="email"> Votre Email</label>
          <input
            type="text"
            id="email"
            class="input-panel-gestion"
            placeholder="Votre email"
          />

          <label for="password"> Votre mot de passe</label>
          <input
            type="password"
            id="password"
            class="input-panel-gestion"
            placeholder="Votre mot de passe"
          />

          <label for="pseudo"> Pseudo : </label>
          <input
            type="text"
            id="pseudo"
            class="input-panel-gestion"
            placeholder="Pseudonyme"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "styles/profil.scss";
</style>
