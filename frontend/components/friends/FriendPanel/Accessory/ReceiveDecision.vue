<script lang="ts" setup>
defineProps<{ id: number; panelId: number }>();
const { acceptRequest, declineRequest } = HandleFriendRequest();

async function salut(id: number, panelId: number) {
  console.log(id, panelId);
  await declineRequest(id, panelId);
}
</script>

<template>
  <div id="decision-content">
    <button
      class="decision"
      id="accept-btn"
      @click="acceptRequest(id, panelId)"
    >
      <!-- <Icon name="ri:check-fill" class="Icon-btn" id="accept-icon" /> -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        class="icon-btn"
        id="accept-icon"
      >
        <path
          fill="currentColor"
          d="M13 21q-.425 0-.712-.288T12 20t.288-.712T13 19h6V5h-6q-.425 0-.712-.288T12 4t.288-.712T13 3h6q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-1.825-8H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7.175L9.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L14.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288T9.3 16.25q-.275-.3-.262-.712t.287-.688z"
        />
      </svg>
    </button>
    <button class="decision" id="decline-btn" @click="salut(id, panelId)">
      <Icon name="ri:close-fill" class="Icon-btn" id="decline-icon" />
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
