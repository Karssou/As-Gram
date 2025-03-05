<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";

const { logout } = HandleAuth();

async function Logout() {
  console.log(logout());
}
</script>

<template>
  <button @click.prevent="logout">LOG-OUT</button>
</template>

<style lang="scss" scoped>
@use "styles/index.scss";
</style>
