<script lang="ts" setup>
import { icons } from "@/app/utils/icons";
import PopOver from "../temporary/PopOver.vue";

const messages = ref<string[]>([]);
const newMessage = ref("");

const joinMenu = ref(false);
</script>

<template>
  <div id="message-input-container">
    <div id="message-join">
      <button
        id="join-btn"
        v-on:mouseenter="joinMenu = !joinMenu"
        v-on:mouseleave="joinMenu = !joinMenu"
        @click=""
      >
        <component :is="icons['plus']" v-if="icons['plus']" id="join-icon" />
      </button>
      <PopOver v-if="joinMenu" message="Joindre un fichier" position="null" />
    </div>

    <div id="input-container">
      <textarea
        id="message-input"
        placeholder="Ecrire un message..."
        v-model="newMessage"
      />
    </div>

    <div id="send-container">
      <button id="send-btn" @click="">
        <component :is="icons['send']" v-if="icons['send']" id="send-icon" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#message-input-container {
  width: 100%;
  height: fit-content;
  background-color: $color-panel;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  position: relative;

  #message-join {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 0 40px;

    #join-btn {
      position: relative;
      min-height: 30px;
      min-width: 30px;
      height: 35px;
      width: 35px;
      max-width: 100%;
      max-height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 7px;
      border: none;
      background-color: transparent;
      transition: all 0.25s ease;

      &::before {
        position: absolute;
        top: 10%;
        left: 112%;
        content: "";
        width: 1.5px;
        height: 80%;
        background-color: white;
      }

      &:hover {
        background-color: $color-background-black-similar-hovered;
        cursor: pointer;
      }

      #join-icon {
        color: white;
        font-size: 200%;
        margin-right: 10%;
      }
    }
  }
  #join-menu {
    position: absolute;
    border-radius: 12px;
    bottom: 112%;
    left: 0;
    width: fit-content;
    height: fit-content;
  }

  #input-container {
    width: 100%;
    min-height: 40px;
    height: fit-content;
    display: flex;
    align-items: center;
    flex: 2 1 80%;

    #message-input {
      height: 100%;
      max-height: 40px;
      width: 100%;
      max-width: 100%;
      background-color: transparent;
      font-family: "Lato";
      font-size: 16px;
      border: none;
      padding: 10px;
      padding-top: 12px;
      color: $color-text;
      resize: none;
      margin: 0 2px;
      display: flex;
      align-items: center;

      &::placeholder {
        color: $color-text-disabled;
        padding: 0;
        font-size: 16px;
        font-family: "Lato";
        line-height: 1;
      }

      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: $color-text;
        border-radius: 10px;
      }
    }
  }

  #send-container {
    width: 100%;
    min-height: 40px;
    height: 100%;
    display: flex;
    flex: 1 1 10%;

    #send-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
      width: 100%;
      min-height: 40px;
      height: 100%;
      border-radius: 0 12px 12px 0;
      background-color: rgb(47, 47, 47);
      border: none;
      transform-origin: center;

      #send-icon {
        color: $color-text;
        font-size: 200%;
        transition: transform 0.125s ease;
      }

      &:hover {
        cursor: pointer;
        background-color: rgb(68, 68, 68);

        #send-icon {
          transform: scale(1.05);
          color: white;
        }
      }
    }
  }
}
</style>
