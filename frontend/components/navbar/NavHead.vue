<script lang="ts" setup>
import { NavbarNavAuth } from "#components";

const { isAuthenticated } = useAuthStore();

const showauth = isAuthenticated;
</script>

<template>
  <div id="nav-head-container">
    <div id="nav-head">
      <NavbarNavAuth v-if="!showauth" />
      <NavbarNavProfile v-if="showauth" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
