<script lang="ts" setup>
const { Received } = storeToRefs(useFriendStore());
</script>

<template>
  <div v-if="Received.length > 0" id="request-container">
    <div v-for="receive in Received" :key="receive.id" id="request-friend">
      <div id="profile-pics"></div>
      <h1>{{ receive.username }}</h1>
      <FriendsFriendPanelAccessoryReceiveDecision
        :id="receive.userId"
        :panel-id="receive.id"
      />
    </div>
  </div>

  <div v-else class="nofriends">
    <h1>Vous n'avez pas de demande d'amis : (</h1>
  </div>
</template>

<style lang="scss" scoped>
@use "panel.scss";
</style>
