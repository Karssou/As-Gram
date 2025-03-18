<script lang="ts" setup>
const { fetchUserInformations } = HandleUser();
import { UserProfileUserInformation } from "#components";
import { onMounted } from "vue";

onMounted(async () => {
  await fetchUserInformations();
});
</script>

<template>
  <div id="page-content">
    <UserProfileUserInformation />
  </div>
</template>

<style lang="scss" scoped>
@use "styles/profil.scss";
</style>
