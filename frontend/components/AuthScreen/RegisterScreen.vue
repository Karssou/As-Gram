<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();

const form = ref({
  username: "",
  email: "",
  password: "",
});

async function Register() {
  const request = await auth.register(form.value);
  console.log(request);
}
</script>

<template>
  <form @submit.prevent="Register" id="register-form">
    <input
      type="text"
      id="auth-register-username"
      class="auth-form-input"
      placeholder="Nom d'utilisateur"
      v-model="form.username"
    />
    <input
      type="text"
      id="auth-register-email"
      class="auth-form-input"
      placeholder="Adresse mail"
      v-model="form.email"
    />

    <input
      type="text"
      id="auth-register-password"
      class="auth-form-input"
      placeholder="Mot de passe"
      v-model="form.password"
    />

    <button type="submit" id="register-submit-btn">Créer le compte</button>
  </form>
</template>

<style lang="scss" scoped>
@use "styles/RegisterScreen.scss";
</style>
