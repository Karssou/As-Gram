<template>
  <div id="messagebox">
    <p id="message-content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid maxime
      labore incidunt dolore! Illum quia optio unde numquam.
    </p>
    <span id="message-timestamp"> 19H </span>

    <div id="menu-on-hover">
      <div id="menu-content">
        <button class="hover-menu-action-btn" id="edit-message-btn">
          <component
            :is="icons['edit']"
            v-if="icons['edit']"
            class="icon-btn"
          />
        </button>
        <button class="hover-menu-action-btn" id="delete-message-btn">
          <component
            :is="icons['delete']"
            v-if="icons['delete']"
            class="icon-btn"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { icons } from "@/app/utils/icons";

const sender = ref();
const timestamp = ref();
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss" as *;

#messagebox {
  max-width: 50%;

  min-width: 50px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 12px;
  background-color: $color-panel;
  position: relative;

  &:hover {
    #menu-on-hover {
      pointer-events: all;
      opacity: 1;
    }
  }

  #message-content {
    color: $color-text;
    font-size: 16px;
    text-align: right;
    font-weight: 400;
    font-family: "lato";
  }

  #message-timestamp {
    color: $color-text;
    font-size: 10px;
    text-align: right;
    margin-right: 10px;
    font-family: "lato";
  }
}

#menu-on-hover {
  position: absolute;
  max-height: 500px;
  min-height: 50px;
  min-width: 50px;
  max-width: 300px;
  height: 50%;
  width: fit-content;
  opacity: 0;
  transform-origin: right;
  bottom: 0;
  left: -30px;
  pointer-events: none;
  transition: all 0.125s ease;

  #menu-content {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 10px;
    flex-direction: column;

    .hover-menu-action-btn {
      width: 25px;
      height: 25px;
      padding: 0;
      box-sizing: border-box;
      background-color: transparent;
      border: none;
      transition: all 0.125s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-btn {
        color: $color-text;
        font-size: 20px;
        transition: all 0.125s ease;
      }

      &:hover {
        cursor: pointer;
      }
    }

    #delete-message-btn:hover {
      .icon-btn {
        color: red;
      }
    }
    #edit-message-btn:hover {
      .icon-btn {
        color: rgb(255, 106, 0);
      }
    }
  }
}
</style>
