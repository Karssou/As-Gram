<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";

const { login } = HandleAuth();
const authstore = useAuthStore();

const form = ref({
  email: "",
  password: "",
});
</script>

<template>
  <form @submit.prevent="login(form)" id="login-form">
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
