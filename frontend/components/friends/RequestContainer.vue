<script lang="ts" setup>
const Showing = ref<"pending" | "friend" | "received">("friend");
const sections = ["friend", "received", "pending"];
async function changeNotifSection(section: "pending" | "friend" | "received") {
  Showing.value = section;
}

const barStyle = computed(() => {
  const index = sections.indexOf(Showing.value);
  const widthPercent = (100 - 2 * 2) / sections.length; 
  return {
    width: `${widthPercent}%`,
    left: `${2 + widthPercent * index}%`, 
  };
});
</script>

<template>
  <div id="friend-request-panel">
    <div id="navigation-friend-request">
      <nav id="navbar">
        <div id="selected" :style="barStyle"></div>
        <ul id="nav-list">
          <li class="nav-link" @click="changeNotifSection('friend')">
            <span class="nav-span">Vos amis</span>
          </li>
          <li class="nav-link" @click="changeNotifSection('received')">
            <span class="nav-span">Reçues</span>
          </li>
          <li class="nav-link" @click="changeNotifSection('pending')">
            <span class="nav-span">En attente</span>
          </li>
        </ul>
      </nav>
    </div>

    <div v-if="Showing === 'friend'" class="friend-request-container">
      <FriendsFriendPanelFriends />
    </div>
    <div v-else-if="Showing === 'received'" class="friend-request-container">
      <FriendsFriendPanelReceivedRequest />
    </div>
    <div v-else="Showing === 'pending'" class="friend-request-container">
      <FriendsFriendPanelPendingRequest />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "styles/RequestContainer.scss";
</style>
