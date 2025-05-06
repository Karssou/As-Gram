<script lang="ts" setup>
import type { UserInformation } from "~/types/UserInformations";

const { fetchUserInformations } = HandleUser();
const route = useRoute();
const userID = route.params.id;

const { data: userinfo } = useAsyncData<UserInformation>(
  `user-information-${userID}`,
  async () => {
    return fetchUserInformations(Number(userID));
  }
);
</script>

<template>
  <div id="page-content">
    <ProfileUserProfileHeader
      v-if="userinfo"
      :user="userinfo.user"
      :relations="userinfo.relations"
      :stats="userinfo.stats"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/profil.scss";
</style>
