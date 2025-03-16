<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";

const { addNotification } = useNotificationStore();
const { register } = HandleAuth();
const authstore = useAuthStore();

const errors = ref<string[]>([]);

const form = ref({
  username: "",
  email: "",
  password: "",
});

async function RegisterAttempt() {
  try {
    const request: any = await register(form.value);
    if (request.status === "error") {
      errors.value.push(request.messages);
      return;
    }

    addNotification("Compte crée avec succès", "success");
  } catch (error: any) {
    addNotification(error, "success");
  }
}
</script>

<template>
  <form @submit.prevent="RegisterAttempt" id="register-form">
    <input
      type="text"
      id="auth-register-username"
      class="auth-form-input"
      placeholder="Nom d'utilisateur"
      v-model="form.username"
    />

    <label v-if="errors.length > 0" for="auth-register-username"> </label>

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
