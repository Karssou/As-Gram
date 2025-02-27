<script lang="ts" setup></script>

<template>
  <div id="auth-container">
    <div id="auth-header">
      <h1>Ecran de connexion</h1>
    </div>

    <div id="auth-content">
      <AuthScreenLoginScreen />
    </div>

    <div id="auth-footer">
      <span>Pas encore de compte ? <a href="">Créer un compte</a></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "styles/AuthScreen.scss";
</style>
