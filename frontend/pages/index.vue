<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();

async function logout() {
  auth.logout();
}
</script>

<template>
  <NuxtLink class="navigation btn" to="/authentification"
    >Page Authentification <icon name="ri:account-circle-fill"
  /></NuxtLink>
  <button @click.prevent="logout">LOG-OUT</button>
</template>

<style lang="scss" scoped>
@use "styles/index.scss";
</style>
