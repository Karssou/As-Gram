<script lang="ts" setup></script>

<template>
  <div id="page-header">
    <NuxtLink class="navigation-btn" to="/">Page Index</NuxtLink>
  </div>
  <div id="auth-page-content">
    <AuthScreen />
  </div>
</template>
<style lang="scss" scoped>
@use "styles/authentification.scss";
</style>
