<script lang="ts" setup>
import { icons } from "~/app/utils/icons";

const links: any = {
  index: { path: "/", name: "Accueil", icon: "home" },
  labo: { path: "/laboratory", name: "Laboratoire", icon: "labo" },
  message: { path: "/message", name: "Messagerie", icon: "message" },
  friends: { path: "/friends", name: "Amis", icon: "friend" },
};
</script>

<template>
  <nav id="navbar">
    <ul id="nav-list">
      <li class="nav-elements" v-for="(link, key) in links" :key="key">
        <NuxtLink class="nav-link" :to="link.path">
          <component
            class="nav-icon"
            v-if="icons[link.icon]"
            :is="icons[link.icon]"
          />
          <span class="nav-element-span"> {{ link.name }}</span></NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
#navbar {
  width: 100%;
  height: 100%;
  max-width: 250px;

  max-height: 30vh;

  #nav-list {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 15px;

    .nav-elements {
      height: 55px;
      width: 80%;

      .nav-link {
        width: 100%;
        transition: all 0.125s ease;
        border-radius: 7px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 5px 10px;
        text-decoration: none;
        color: white;
        font-family: "Ubuntu", sans-serif;

        &:hover {
          background: white;
          color: black;
        }

        .nav-icon {
          font-size: 24px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
