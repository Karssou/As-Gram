<script lang="ts" setup>
const email = ref("");
const password = ref("");
</script>

<template>
  <form action="" id="login-form">
    <input
      type="text"
      id="auth-login-email"
      class="auth-form-input"
      placeholder="Adresse mail"
    />

    <input
      type="text"
      id="auth-login-password"
      class="auth-form-input"
      placeholder="Mot de passe"
    />

    <button type="submit" id="login-submit-btn">Se connecter</button>
  </form>
</template>

<style lang="scss" scoped>
@use "styles/LoginScreen.scss";
</style>
