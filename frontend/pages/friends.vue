<script lang="ts" setup>
const { indexRequest } = HandleFriendRequest();
const { fetchMyInformations } = HandleUser();

await indexRequest();
await fetchMyInformations();
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
