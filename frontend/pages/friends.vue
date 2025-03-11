<script lang="ts" setup>
const { indexRequest } = HandleFriendRequest();

import { onMounted } from "vue";

onMounted(async () => {
  await indexRequest();
});
</script>

<template>
  <main id="page-content">
    <FriendsAddFriend  />
    <FriendsRequestContainer  />
  </main>
</template>

<style lang="scss" scoped>
@use "styles/friends.scss";
</style>
