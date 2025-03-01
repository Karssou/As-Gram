<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";

const auth = useAuthStore();

async function logout() {
  await auth.logout();
  await navigateTo("/authentification");
}

onMounted(() => {
  auth.me;
});
</script>

<template>
  <NuxtLink class="navigation btn" to="/authentification"
    >Page Authentification</NuxtLink
  >

  <button @click.prevent="logout">LOG-OUT</button>

  <div v-if="auth.user">
    <h1>Salut {{ auth.user }}</h1>
  </div>

  <div v-else>
    <h1>Aucun utilisateur</h1>
  </div>
</template>

<style lang="scss" scoped>
@use "styles/index.scss";
</style>
