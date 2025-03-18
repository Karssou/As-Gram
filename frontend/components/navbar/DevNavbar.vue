<script lang="ts" setup>
import { icons } from "@/app/utils/icons";

const links = {
  auth: { path: "/authentification", icon: "user" },
  labo: { path: "/laboratory", icon: "labo" },
  index: { path: "/", icon: "home" },
  friends: { path: "/friends", icon: "friend" },
  profile: { path: "/profil/[id]", icon: "manageaccount" },
};
</script>

<template>
  <div id="navbar-container">
    <nav id="navbar">
      <li v-for="(link, key) in links" :key="key" class="nav-link">
        <NuxtLink class="nav-linker" :to="link.path">
          <component
            :is="icons[link.icon]"
            class="nav-icon"
            v-if="icons[link.icon]"
          />
          <span class="nav-span">{{ key }}</span>
        </NuxtLink>
      </li>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@use "navbar.scss";
</style>
