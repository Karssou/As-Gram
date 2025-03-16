<script lang="ts" setup>
const { logout } = HandleAuth();
</script>

<template>
  <button id="disconnect-btn" @click="logout()">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      id="icon-disconnect"
    >
      <path
        fill="currentColor"
        d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h6q.425 0 .713.288T12 20t-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12t.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z"
      />
    </svg>
    <span class="span-btn">Se déconnecter</span>
  </button>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#disconnect-btn {
  width: fit-content;
  min-width: 150px;
  max-width: 200px;
  background-color: $color-button-red;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  border: 1px solid $color-border;
  padding: 3px 10px;
  transition: all 0.2s ease;

  .span-btn {
    color: $color-text;
    font-size: 16px;
    font-family: "Lato", sans-serif;
    font-weight: 600;
  }

  #icon-disconnect {
    width: 26px;
    color: white;
  }

  &:hover {
    cursor: pointer;
    background-color: $color-button-red-hover;
  }
}
</style>
