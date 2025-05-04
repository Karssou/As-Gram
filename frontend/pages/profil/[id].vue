<script lang="ts" setup>
const { fetchUserInformations } = HandleUser();
const route = useRoute();
const userID = route.params.id;

const { data: userinfo } = useAsyncData(
  `user-information-${userID}`,
  async () => {
    return fetchUserInformations(Number(userID));
  }
);
</script>

<template>
  <div id="page-content">
    <ProfileUserProfileHeader v-if="userinfo" :user="userinfo" />
  </div>
</template>

<style lang="scss" scoped>
@use "styles/profil.scss";
</style>
