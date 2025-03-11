<script lang="ts" setup>
const { Friends } = storeToRefs(useFriendStore());
</script>

<template>
  <div v-if="Friends.length > 0" id="friends-container">
    <div v-for="friend in Friends" :key="friend.id" id="friends">
      <div id="profile-pics"></div>
      <h1>{{ friend.username }}</h1>
      <FriendsFriendPanelAccessoryFriendMoreBTN
        :id="friend.userId"
        :panelid="friend.id"
      />
    </div>
  </div>

  <div v-else class="nofriends">
    <h1>Vous n'avez pas d'amis : (</h1>
  </div>
</template>

<style lang="scss" scoped>
@use "panel.scss";
</style>
