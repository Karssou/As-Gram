<script lang="ts" setup>
import { Icon } from "#components";

const links = {
  auth: { path: "/authentification", icon: "ri:user-3-line" },
  laboratory: { path: "/laboratory", icon: "ri:ink-bottle-line" },
  index: { path: "/", icon: "ri:indeterminate-circle-fill" },
  friends: { path: "/friends", icon: "ri:user-add-line" },
};
</script>

<template>
  <div id="navbar-container">
    <nav id="navbar">
      <li v-for="(link, key) in links" :key="key" class="nav-link">
        <NuxtLink class="nav-linker" :to="link.path">
          <Icon :name="link.icon" class="nav-icon" />
          <span class="nav-span">{{ key }}</span>
        </NuxtLink>
      </li>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@use "navbar.scss";
</style>
