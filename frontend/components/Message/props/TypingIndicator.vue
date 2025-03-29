<script lang="ts" setup></script>

<template>
  <div id="typing-indicator-container">
    <div class="boule"></div>
    <div class="boule"></div>
    <div class="boule"></div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#typing-indicator-container {
  width: auto;
  min-width: fit-content;
  min-height: fit-content;
  height: 30px;
  border-radius: 500px;
  background-color: $color-panel;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0 10px;
  flex-wrap: nowrap;

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    60% {
      transform: translateY(-4px);
    }
  }

  .boule {
    width: 0.6em;
    height: 0.6em;
    flex-wrap: nowrap;
    border-radius: 50%;
    background: linear-gradient(115deg, #fdfcfb, #e2d1c3);
    animation: bounce 1.5s infinite ease-in-out;

    &:nth-child(1) {
      animation-delay: 0s;
    }

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}
</style>
