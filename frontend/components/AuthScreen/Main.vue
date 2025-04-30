<script lang="ts" setup>
import { AuthScreenRegister } from "#components";

const IsLogin = ref(false);
</script>

<template>
  <div id="ConnectionForm">
    <section class="header">
      <h1 v-if="IsLogin">Connectez-vous</h1>
      <h1 v-else>Inscrivez vous</h1>
    </section>
    <section class="content">
      <AuthScreenRegister />
    </section>
    <section class="footer">
      <span>Déjà un compte ? <a href="">Connectez vous !</a></span>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#ConnectionForm {
  width: 600px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border: 1px solid $color-border;
  border-radius: 10px;
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px 0;

    flex: 1 1 auto;

    h1 {
      color: $color-text;
      font-family: "Ubuntu";
      font-weight: 700;
      font-size: 2.5rem;
    }
  }
  .content {
    padding: 25px 2%;
    flex: 2 1 auto;
  }
  .footer {
    flex: 1 1 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
