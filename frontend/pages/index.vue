<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();

const info = await auth.me();

console.log(info);

async function logout() {
  auth.logout();
}
</script>

<template>
  <button @click.prevent="logout">LOG-OUT</button>
</template>

<style lang="scss" scoped>
@use "styles/index.scss";
</style>
