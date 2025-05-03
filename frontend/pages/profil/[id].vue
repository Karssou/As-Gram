<script lang="ts" setup>
const { fetchUserInformations } = HandleUser();
const { user } = useUserStore();
const route = useRoute();
const userID = route.params.id;

const { data: userinfo } = useAsyncData(
  `user-information-${userID}`,
  async () => {
    return fetchUserInformations();
  }
);
</script>

<template>
  <div id="page-content">
    <ProfileUserProfileHeader :user="userinfo.user" />
  </div>
</template>

<style lang="scss" scoped>
@use "styles/profil.scss";
</style>
