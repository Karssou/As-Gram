<script lang="ts" setup>
const IsLogin = ref(true);

const ToggleAuthScreen = () => {
  IsLogin.value = !IsLogin.value;
};
</script>

<template>
  <div id="auth-container">
    <div id="auth-header">
      <h1>Ecran de connexion</h1>
    </div>

    <div id="auth-content">
      <AuthScreenLoginScreen v-if="IsLogin" />
      <AuthScreenRegisterScreen v-else />
    </div>

    <div id="auth-footer">
      <span v-if="IsLogin"
        >Pas encore de compte ?
        <a href="" @click.prevent="ToggleAuthScreen">Créer un compte</a></span
      >
      <span v-else
        >Déjà un compte ?
        <a href="" @click.prevent="ToggleAuthScreen">Connectez-vous</a></span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "styles/AuthScreen.scss";
</style>
