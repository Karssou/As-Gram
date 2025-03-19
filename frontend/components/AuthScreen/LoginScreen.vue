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
    <div class="input-container">
      <span>Email :</span>
      <input
        type="text"
        id="auth-login-email"
        class="auth-form-input"
        placeholder="Adresse mail"
        v-model="form.email"
      />
    </div>

    <div class="input-container">
      <span>Mot de passe :</span>
      <input
        type="text"
        id="auth-login-password"
        class="auth-form-input"
        placeholder="Mot de passe"
        v-model="form.password"
      />
    </div>

    <button type="submit" id="login-submit-btn">Se connecter</button>
  </form>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#login-form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5%;
  justify-content: space-evenly;

  .input-container {
    display: flex;
    width: 80%;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    .auth-form-input {
      width: 50%;
      height: 30px;
      border: none;
      border-radius: 5px;
      padding: 5px 10px;
      background-color: $color-grey-light;
      border: 1px solid $color-border-discret;
      color: $color-text;
      font-family: "Roboto", sans-serif;

      &::placeholder {
        color: $color-text-disabled;
      }
    }

    span {
      width: 100%;
      color: $color-text;
      font-family: "Lato", sans-serif;
      text-align: center;
    }
  }

  #login-submit-btn {
    min-width: 200px;
    width: 30%;
    height: 30px;
    border: none;
    border-radius: 5px;
    background-color: transparent;
    color: $color-text;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    transition: all 0.25s ease;
    border: 2px solid $color-text;

    &:hover {
      background-color: $color-text;
      color: $color-panel;
      cursor: pointer;
    }
  }
}
</style>
