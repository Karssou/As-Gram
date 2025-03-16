<script lang="ts" setup>
import { icons } from "~/app/utils/icons";

const links: any = {
  labo: { path: "/laboratory", name: "Laboratoire" },
  index: { path: "/", name: "Accueil", icon: "home" },
  friends: { path: "/friends", name: "Amis" },
};
</script>

<template>
  <nav id="navbar">
    <ul id="nav-list">
      <li class="nav-elements" v-for="(link, key) in links" :key="key">
        <component
          class="nav-icon"
          v-if="icons[link.icon]"
          :is="icons[link.icon]"
        />
        <NuxtLink class="nav-link" :to="link.path"> {{ link.name }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
#navbar {
  width: 100%;
  height: 100%;
  max-width: 150px;
  max-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: red;

  #nav-list {
    width: 100%;
    background-color: blue;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;

    .nav-elements {
      background: green;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
