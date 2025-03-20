<script lang="ts" setup>
import { timeAgo } from "~/app/utils/FormatDate";

const { Pending } = storeToRefs(useFriendStore());
console.log(Pending);
</script>

<template>
  <div v-if="Pending.length > 0" id="pending-container">
    <div v-for="pend in Pending" :key="pend.id" id="request-pending">
      <div id="profile-pics"></div>
      <h1>{{ pend.username }}</h1>

      <p >Envoyé {{ timeAgo(pend.createdAt) }}</p>
    </div>
  </div>

  <div v-else class="nofriends">
    <h1>Vous n'avez pas de demande en attentes : (</h1>
  </div>
</template>

<style lang="scss" scoped>
@use "panel.scss";
</style>
