<script lang="ts" setup>
import { timeAgo } from "~/app/utils/FormatDate";

const { sendRequest, indexRequest, declineRequest, acceptRequest } =
  HandleFriendRequest();

const pseudo = ref("");

const { PendingRequest } = storeToRefs(useFriendStore());

await indexRequest();

async function AddFriend(pseudo: string) {
  await sendRequest(pseudo);
}

async function AcceptRequest(pseudo: string) {
  await acceptRequest(pseudo);
}

async function DeclineRequest(pseudo: string, panelId: number) {
  await declineRequest(pseudo, panelId);
}
</script>

<template>
  <main id="page-content">
    <h1>Amis</h1>
    <div id="div-gestion-friend">
      <form @submit.prevent="AddFriend(pseudo)" id="add-friend-form">
        <input type="text" v-model="pseudo" placeholder="Nom de l'ami" />
        <button type="submit">Add Friend</button>
      </form>
    </div>
    <div id="friend-list-container">
      <div
        v-for="pending in PendingRequest"
        :key="pending.id"
        id="friend-panel"
      >
        <div id="pp"></div>

        <h1>{{ pending.sender!.username }}</h1>
        <p>{{ timeAgo(pending.created_at) }}</p>

        <div id="panel-friend-choice">
          <button
            @click="AcceptRequest(pending.sender!.username)"
            class="panel-friend-btn"
          >
            <Icon
              class="panel-friend-btn-icon"
              id="panel-icon-accept"
              name="ri:check-fill"
            />
          </button>
          <button
            @click="DeclineRequest(pending.sender!.username, pending.id)"
            class="panel-friend-btn"
          >
            <Icon
              class="panel-friend-btn-icon"
              name="ri:close-fill"
              id="panel-icon-decline"
            />
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use "styles/friends.scss";
</style>
