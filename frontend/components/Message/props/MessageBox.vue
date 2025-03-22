<template>
  <div id="arrow"></div>
  <div id="messagebox">
    <p id="message-content">{{ message }}</p>
    <span id="message-timestamp"> {{ timestamp }} </span>

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
import socket from "~/plugins/socket";
import { icons } from "@/app/utils/icons";

defineProps({
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
});

onUnmounted(() => {
  socket.off("message");
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss" as *;

#messagebox {
  max-width: 50%;
  position: relative;
  min-width: 50px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 12px;
  background-color: $color-panel;
  position: relative;
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    transform: rotate(45deg);
    border-radius: 0px;
    top: 20%;
    left: 95%;
    width: 15px;
    height: 15px;
    background: $color-panel;
  }

  &:hover {
    #menu-on-hover {
      opacity: 1;
      pointer-events: all;
    }
  }

  #message-content {
    z-index: 11;
    color: $color-text;
    font-size: 1rem;
    text-align: right;
    font-weight: 400;
    font-family: "lato";
    white-space: wrap;
    line-height: 1.3;
    word-wrap: break-word;
  }

  #message-timestamp {
    color: $color-text;
    font-size: 0.8rem;
    text-align: right;
    font-style: italic;
    font-family: "lato";
    user-select: none;
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
  z-index: 200;

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
