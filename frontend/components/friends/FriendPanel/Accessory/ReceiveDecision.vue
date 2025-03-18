<script lang="ts" setup>
import { icons } from "@/app/utils/icons";

defineProps<{ id: number; panelId: number }>();
const { acceptRequest, declineRequest } = HandleFriendRequest();
</script>

<template>
  <div id="decision-content">
    <button
      class="decision"
      id="accept-btn"
      @click="acceptRequest(id, panelId)"
    >
      <component
        :is="icons['check']"
        v-if="icons['check']"
        class="Icon-btn"
        id="accept-icon"
      />
    </button>
    <button
      class="decision"
      id="decline-btn"
      @click="declineRequest(id, panelId)"
    >
      <component
        :is="icons['close']"
        v-if="icons['close']"
        class="Icon-btn"
        id="decline-icon"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#decision-content {
  display: flex;
  gap: 15px;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-grow: 0;
  .decision {
    width: 35px;
    height: 35px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 7px;
    transition: background 0.125s ease;

    .Icon-btn {
      font-size: 24px;
      color: white;
    }

    &:hover {
      background-color: white;
    }
  }

  #accept-btn:hover {
    .Icon-btn {
      color: green;
    }
  }
  #decline-btn:hover {
    .Icon-btn {
      color: $color-warning;
    }
  }
}
</style>
