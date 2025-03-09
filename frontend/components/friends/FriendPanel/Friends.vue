<script lang="ts" setup>
const { Friends } = storeToRefs(useFriendStore());
</script>

<template>
  <div v-if="Friends.length > 0" id="request-container">
    <div v-for="friend in Friends" :key="friend.id" id="request-friend">
      <div id="profile-pics"></div>
      <h1>{{ friend.username }}</h1>
      <FriendsFriendPanelAccessoryFriendMoreBTN />
    </div>
  </div>

  <div v-else id="nofriends">
    <h1>Vous n'avez pas d'amis : (</h1>
  </div>
</template>

<style lang="scss" scoped>
@use "Friends.scss";
</style>
