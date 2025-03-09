<script lang="ts" setup>
const { Pending } = storeToRefs(useFriendStore());
</script>

<template>
  <div v-if="Pending.length > 0" id="request-container">
    <div v-for="pend in Pending" :key="pend.id" id="request-friend">
      <div id="profile-pics"></div>
      <h1>{{ pend.username }}</h1>
      <FriendsFriendPanelAccessoryFriendMoreBTN />
    </div>
  </div>

  <div v-else id="nofriends">
    <h1>Vous n'avez pas de demande en attentes : (</h1>
  </div>
</template>

<style lang="scss" scoped>
@use "Friends.scss";
</style>
