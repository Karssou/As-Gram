<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();

const form = ref({
  email: "",
  password: "",
});

async function Login() {
  const request = await auth.login(form.value);
  console.log(request);
}
</script>

<template>
  <form @submit.prevent="Login" id="login-form">
    <input
      type="text"
      id="auth-login-email"
      class="auth-form-input"
      placeholder="Adresse mail"
      v-model="form.email"
    />

    <input
      type="text"
      id="auth-login-password"
      class="auth-form-input"
      placeholder="Mot de passe"
      v-model="form.password"
    />

    <button type="submit" id="login-submit-btn">Se connecter</button>
  </form>
</template>

<style lang="scss" scoped>
@use "styles/LoginScreen.scss";
</style>
