<script setup lang="ts">
const { user } = useUserStore();

const Informations = 3;
</script>

<template>
  <div id="user-informations-container">
    <div id="user-informations-header">
      <h1>Vos Informations</h1>
    </div>
    <div id="user-information-form">
      <div v-for="information in Informations" class="information-section">
        <span class="information-span">{{ information }}</span>
        <input
          type="text"
          class="information-input"
          :placeholder="information"
        />
      </div>
    </div>
    <div id="user-informations-form">
      <button @submit.prevent="" id="send-user-info">
        <span>Enregistrer</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#user-informations-container {
  @include gradient-blue-leger;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 2px solid $color-border;
  border-radius: 12px;
  padding: 2% 3%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 60px;
  #user-informations-header {
    width: 100%;
    height: 100%;
    flex: 0 0 15%;

    h1 {
      color: $color-text;
      text-transform: uppercase;
      font-family: "Montserrat", sans-serif;
      font-size: clamp(24px, 60px, 10vw);
      font-weight: 600;
    }
  }
  #user-information-form {
    width: 100%;
    height: 100%;
    min-height: 400px;
    flex: 1 0 85%;
    display: flex;
    justify-content: space-around;
    gap: 10px;
    flex-wrap: wrap;

    .information-section {
      min-width: 200px;
      height: 10%;
      gap: 20px;
      display: flex;
      flex-direction: column;
      background-color: blue;
      padding: 10px;
      border-radius: 10px;

      .information-span {
        color: $color-text;
        font-family: "Lato", sans-serif;
      }

      .information-input {
        min-width: 200px;
        width: fit-content;
        background-color: $color-panel;
        border: 1px solid $color-border-discret;
        padding: 10px 5px;
        border-radius: 7px;
        color: $color-text;

        &::placeholder {
          color: $color-text;
        }
      }
    }
  }
}
</style>
