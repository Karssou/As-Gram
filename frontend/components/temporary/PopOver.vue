<script lang="ts" setup>
import type { DefineProps } from "vue";

defineProps({
  message: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div id="menu-container">
    <div id="menu-content">
      <span id="menu-span"> {{ message }} </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#menu-container {
  position: absolute;
  top: 106%;
  transform: translate(-50%, 0);
  left: 3%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: fit-content;
  min-width: 100px;
  padding: 0 2%;
  max-width: 500px;
  min-height: 30px;
  max-height: fit-content;
  background-color: $color-black;
  border-radius: 7px;
  z-index: 98;

  &::before {
    position: absolute;
    left: 50%;
    bottom: 90%;
    content: "";
    width: 7px;
    height: 7px;
    transform: rotate(45deg);
    background-color: $color-black;
    z-index: 96;
    border-radius: 20%;
  }

  #menu-content {
    z-index: 100;
    width: fit-content;
    min-height: 30px;
    height: 100%;
    display: flex;
    white-space: nowrap;
    align-items: center;
    justify-content: center;

    #menu-span {
      color: white;
      font-family: "Inter";

      font-size: 12px;
      font-weight: 500;
    }
  }
}
</style>
