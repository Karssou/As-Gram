<script lang="ts" setup>
definePageMeta({
  middleware: "check-auth",
});
</script>

<template>
  <div id="auth-page-content">
    <AuthScreen />
  </div>
</template>
<style lang="scss" scoped>
@use "styles/authentification.scss";
</style>
