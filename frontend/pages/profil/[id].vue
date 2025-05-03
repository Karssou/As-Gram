<script lang="ts" setup>
const { fetchUserInformations } = HandleUser();

const route = useRoute();
const userId = route.params.id;
</script>

<template>
  <div id="page-content">
    <ProfileUserProfileHeader />
  </div>
</template>

<style lang="scss" scoped>
@use "styles/profil.scss";
</style>
