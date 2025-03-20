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
@use "@/assets/styles/variables.scss" as *;

#auth-container {
  display: flex;
  flex-direction: column;

  width: min(90vw, 700px);
  height: max(60vh, 700px);
  border: 2px solid $color-border;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 24px;
  background-color: $color-panel;

  #auth-header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 0 10%;
    padding-top: 10%;
    h1 {
      font-family: sans-serif;
      text-transform: uppercase;
      font-size: 1.8rem;
      font-weight: 600;
      letter-spacing: 0.5;
      color: $color-text;
    }
  }

  #auth-content {
    flex: 2 0 70%;
  }

  #auth-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 1 10%;

    span {
      font-size: 14px;
      color: $color-text;

      a {
        color: rgb(255, 255, 255);
      }
    }
  }
}
</style>
