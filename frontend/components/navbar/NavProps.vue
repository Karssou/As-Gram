<script lang="ts" setup>
import { icons } from "@/app/utils/icons";
</script>

<template>
  <div id="props-container">
    <ul id="props-list">
      <li class="prop">
        <component
          class="prop-icon"
          :is="icons['darkmode']"
          v-if="icons['darkmode']"
        />
      </li>
      <li class="prop">
        <component
          class="prop-icon"
          :is="icons['darkmode']"
          v-if="icons['darkmode']"
        />
      </li>
      <li class="prop">
        <component
          class="prop-icon"
          :is="icons['darkmode']"
          v-if="icons['darkmode']"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
#props-container {
  width: 250px;
  min-height: 60px;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;

  #props-list {
    width: 70%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    gap: 10%;

    .prop {
      width: 30px;
      height: 30px;
      border-radius: 7px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: white;
        transition: background 0.125s ease;
        cursor: pointer;

        .prop-icon {
          color: black;
        }
      }

      .prop-icon {
        color: white;
        font-size: larger;
      }
    }
  }
}
</style>
