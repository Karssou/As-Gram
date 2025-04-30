<script lang="ts" setup>
import { icons } from "@/app/utils/icons";
</script>

<template>
  <div id="notification">
    <span id="notif-title"> Salut je suis </span>
    <button id="notif-remove-btn">
      <component :is="icons['close']" v-if="icons['close']" id="notif-icon" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#notification {
  min-width: 400px;
  max-width: 10vw;
  height: 60px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  padding: 0 5% 0 2%;
  justify-content: flex-start;
  margin-bottom: 7px;
  transition: all 0.2s ease;
  border: 1px solid $color-border;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  #notif-title {
    margin: 0 auto 0 5px;
    width: 100%;
    max-height: 30px;
    color: white;
    overflow: hidden;
    font-size: 0.9rem;
    font-family: "Ubuntu";
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  #notif-icon {
    font-size: 200%;
  }

  #notif-remove-btn {
    border-radius: 50%;
    border: none;
    display: flex;
    background: transparent;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    padding: 0;
    transition: all 0.125s ease;

    #notif-icon-btn {
      width: 20px;
      height: 20px;
      color: var(--notif-icon-color);
    }

    &:hover {
      cursor: pointer;
      background: rgb(212, 212, 212);
    }
  }
}
</style>
