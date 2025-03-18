<script lang="ts" setup>
const { indexRequest } = HandleFriendRequest();
const { fetchUserInformations } = HandleUser();
import { onMounted } from "vue";

onMounted(async () => {
  await indexRequest();
  await fetchUserInformations();
});
</script>

<template>
  <main id="page-content">
    <FriendsAddFriend />
    <FriendsRequestContainer />
  </main>
</template>

<style lang="scss" scoped>
@use "styles/friends.scss";
</style>
