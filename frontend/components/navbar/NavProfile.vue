<script lang="ts" setup>
import { icons } from "@/app/utils/icons";

const { user } = useUserStore();

const Isdropopen = ref(false);

function toggleDropdown() {
  Isdropopen.value = !Isdropopen.value;
}
</script>

<template>
  <div id="profile-container">
    <button id="navbar-profile-btn" @click="toggleDropdown">
      <div id="profile-pics"></div>
      <span id="span-username"> {{ user?.username }} </span>
      <component
        :is="icons['arrowbottom']"
        v-if="icons['arrowbottom']"
        id="arrow-dropdown-menu"
        :class="{ animated: Isdropopen }"
      />
    </button>
    <div id="dropdown-menu" :class="{ open: Isdropopen }">
      <ul id="dropdown-options">
        <li class="dropdown-elements">
          <component
            class="dropdown-element-icon"
            :is="icons['user']"
            v-if="icons['user']"
          />
          <span class="dropdown-element-span">Voir le profil</span>
        </li>
        <li class="dropdown-elements">
          <component
            class="dropdown-element-icon"
            :is="icons['settings']"
            v-if="icons['settings']"
          />
          <span class="dropdown-element-span">Paramètres</span>
        </li>
        <li class="dropdown-elements">
          <component
            class="dropdown-element-icon"
            :is="icons['logout']"
            v-if="icons['logout']"
          />
          <span class="dropdown-element-span">Se déconnecter</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#profile-container {
  width: 250px;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding-top: 0px;

  #navbar-profile-btn {
    width: 90%;
    min-height: 60px;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 12px;
    border: none;
    background: transparent;
    padding: 0 6% 0 5px;
    position: relative;
    transition: background 0.125s ease;

    &:focus,
    &:hover {
      background-color: rgb(248, 248, 248);
      cursor: pointer;

      #span-username {
        color: black;
      }

      #arrow-dropdown-menu {
        color: rgb(0, 0, 0);
      }
    }

    #profile-pics {
      border-radius: 50%;
      width: 50px;
      height: 50px;
      background-color: rgb(255, 0, 0);
      margin-right: 15px;
    }
    #span-username {
      color: rgb(255, 255, 255);
      margin-right: auto;
      width: fit-content;
      max-width: 80%;
      font-family: "Lato", sans-serif;
      pointer-events: none;
      font-size: clamp(12px, 20px, 24px);
    }
    #arrow-dropdown-menu {
      font-size: 24px;
      margin-top: 2%;
      color: white;
      transform-origin: center;
      transition: transform 0.3s ease;

      &.animated {
        transform: rotate(180deg);
      }
    }
  }

  #dropdown-menu {
    transition: height 0.3s ease, max-height 0.3s ease;
    width: 90%;
    max-height: 0;
    transform: scaleY(0);
    border-radius: 7px;
    opacity: 0;
    justify-content: center;
    align-items: center;
    transform-origin: top;

    &.open {
      max-height: 200px;
      opacity: 1;
      transform: scaleY(1);
      padding: 5px;
    }

    #dropdown-options {
      width: 100%;
      height: 100%;
      display: flex;
      gap: 1px;
      flex-direction: column;

      .dropdown-elements {
        display: flex;
        padding: 15px 5%;
        align-items: center;
        justify-content: flex-start;

        border-radius: 7px;

        width: 100%;
        min-height: 25px;
        transition: all 0.125s ease;

        .dropdown-element-span {
          color: $color-text;
          font-size: 14px;
          line-height: 0;
          text-transform: uppercase;
          font-family: "ubuntu";
        }

        .dropdown-element-icon {
          color: white;
          font-size: 20px;
          margin-right: 10px;
        }

        &:hover {
          cursor: pointer;
          background: white;

          .dropdown-element-span {
            color: black;
          }
          .dropdown-element-icon {
            color: black;
          }
        }
      }
    }
  }
}
</style>
