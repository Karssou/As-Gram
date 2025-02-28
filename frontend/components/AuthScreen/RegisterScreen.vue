<script lang="ts" setup></script>

<template>
  <form action="" id="register-form">
    <input
      type="text"
      id="auth-register-username"
      class="auth-form-input"
      placeholder="Nom d'utilisateur"
    />
    <input
      type="text"
      id="auth-register-email"
      class="auth-form-input"
      placeholder="Adresse mail"
    />

    <input
      type="text"
      id="auth-register-password"
      class="auth-form-input"
      placeholder="Mot de passe"
    />

    <button type="submit" id="register-submit-btn">Créer le compte</button>
  </form>
</template>

<style lang="scss" scoped>
@use "styles/RegisterScreen.scss";
</style>
