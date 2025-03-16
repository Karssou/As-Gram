<script lang="ts" setup>
import { icons } from "@/app/utils/icons";

const links = {
  auth: { path: "/authentification", icon: "ri:user-3-line" },
  labo: { path: "/laboratory", icon: "test" },
  index: { path: "/", icon: "home" },
  friends: { path: "/friends", icon: "friend" },
  profile: { path: "/profil/[id]", icon: "usermanage" },
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
