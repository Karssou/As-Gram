<script setup lang="ts">
import DevNavbar from "~/components/navbar/DevNavbar.vue";

const { isAuthenticated } = useAuthStore();
</script>

<template>
  <div id="status">
    <h1 v-if="isAuthenticated">Status : Connecté</h1>
    <h1 v-else>Status : Hors Ligne</h1>
  </div>
  <DevNavbar />

  <NuxtPage />

  <TemporaryNotifications />
</template>

<style lang="scss" scoped>
#status {
  position: fixed;
  right: 5%;
  top: 5%;
  width: 10vw;
  pointer-events: none;
  display: flex;
  text-align: end;

  h1 {
    color: white;
    font-family: "Lato";
    font-weight: bold;
  }
}
</style>
