<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";

const { logout } = HandleAuth();

async function Logout() {
  console.log(logout());
}
</script>

<template>
  <main id="page-content">
    <ButtonsUserDisconnect />
  </main>
</template>

<style lang="scss" scoped>
#page-content {
  width: 60vw;
  max-width: 1000px;
  min-height: 100vh;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>
