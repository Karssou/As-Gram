<script lang="ts" setup>
import { icons } from "@/app/utils/icons";
</script>

<template>
  <div id="join-menu">
    <button class="choice">
      <component
        :is="icons['addImage']"
        v-if="icons['addImage']"
        class="choice-icon"
      />

      <span>Image</span>
    </button>
    <button class="choice">
      <component
        :is="icons['addFile']"
        v-if="icons['addFile']"
        class="choice-icon"
      />

      <span>Document</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#join-menu {
  display: flex;
  overflow: hidden;
  min-width: 100px;
  max-width: 300px;
  width: 100%;
  min-height: 40px;
  max-height: 200px;
  height: 100%;
  flex-direction: column;

  .choice {
    display: flex;
    align-items: center;
    white-space: nowrap;
    justify-content: flex-start;
    min-width: 70px;
    max-width: 300px;
    width: 100%;
    height: 35px;
    padding: 5px 10px;
    border: none;
    background-color: $color-panel;
    display: inline-flex;
    flex-wrap: nowrap;
    transition: background 0.2s ease;

    .choice-icon {
      transition: color 0.1s ease;
      color: $color-text;
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }

    span {
      transition: color 0.1s ease;
      color: $color-text;
      font-family: "Lato";
    }

    &:hover {
      cursor: pointer;
      background-color: white;
      span {
        color: black;
      }

      .choice-icon {
        color: black;
      }

      color: black;
    }
  }
}
</style>
