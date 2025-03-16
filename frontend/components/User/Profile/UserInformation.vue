<script setup lang="ts">
const { updateUserInformations } = HandleUser();

const { user } = useUserStore();

const profileForm = ref({ ...user });

async function Attemptupdate() {
  await updateUserInformations(profileForm.value);
}

const GenderOptions = [
  { value: "male", label: "Homme" },
  { value: "female", label: "Femme" },
];
</script>

<template>
  <div id="user-informations-container">
    <div id="user-informations-header">
      <h1>Modifier Vos Informations</h1>
    </div>
    <div id="panel-content">
      <form action="" id="form-panel" @submit.prevent="Attemptupdate()">
        <div id="form-content">
          <div class="input-container">
            <span class="span-input"> Modifier votre pseudo</span>
            <input type="text" placeholder="" v-model="profileForm.username" />
          </div>
          <div class="input-container">
            <span class="span-input"> Nom complet </span>
            <input type="text" placeholder="" v-model="profileForm.fullName" />
          </div>
          <div class="input-container">
            <span class="span-input"> Modifier votre bio </span>
            <textarea
              name="area-bio"
              id="area-bio"
              v-model="profileForm.biography"
            >
            </textarea>
          </div>
          <div class="input-container">
            <span class="span-input"> Votre genre </span>
            <InputsSelectBox
              v-model="profileForm.gender"
              :options="GenderOptions"
              className="input-gender"
            />
          </div>
          <div class="input-container">
            <span class="span-input"> Votre date de naissance </span>
            <input
              type="date"
              v-model="profileForm.birthdate"
              class="input-birthdate"
            />
          </div>
          <div class="input-container">
            <span class="span-input"> Votre email </span>
            <input type="email" placeholder="" v-model="profileForm.email" />
          </div>
        </div>

        <div id="form-footer">
          <button id="send-btn">Enregistrer</button>
        </div>
      </form>
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
  min-height: 500px;
  max-height: 90vh;
  border: 2px solid $color-border;
  border-radius: 12px;
  padding: 2% 3%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 60px;

  #user-informations-header {
    width: 100%;
    flex: 0 0 15%;

    h1 {
      color: $color-text;
      text-transform: uppercase;
      font-family: "Montserrat", sans-serif;
      font-size: clamp(16px, 48px, 8vw);
      font-weight: 600;
    }
  }

  #panel-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    #form-panel {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding: 2%;
      overflow-x: hidden;
      overflow-y: auto;
      scrollbar-gutter: stable both-edges;

      &::-webkit-scrollbar {
        width: 8px;
        transition: opacity 0.3s ease-in-out;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.437);
        border-radius: 12px;
      }

      #form-content {
        width: 100%;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 25px;

        .input-container {
          width: 100%;
          height: 150px;
          display: flex;
          flex-direction: column;
          gap: 25px;
          padding: 10px;

          .span-input {
            color: $color-text;
            text-transform: uppercase;
            font-family: "lato", sans-serif;
            font-size: 16px;
          }

          input {
            width: fit-content;
            min-width: 100px;
            line-height: 0;
            border-radius: 5px;
            padding: 7px 10px;
            border: 1px solid $color-border-discret;
            background-color: $color-panel;
            color: $color-text;
          }

          .input-birthdate {
            width: 300px;
            height: fit-content;
          }

          textarea {
            width: 100%;
            min-width: 100px;
            height: fit-content;
            min-height: 100px;
            padding: 5px 10px;
            border: 1px solid $color-border-discret;
            border-radius: 7px;
            background-color: $color-panel;
            color: $color-text;
            font-family: "lato", sans-serif;
            resize: none;
          }
        }
      }

      #form-footer {
        width: 100%;
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 2% 10px;

        #send-btn {
          padding: 5px 10px;
          border-radius: 5px;
          border: 2px solid white;
          background-color: transparent;
          color: white;
          transition: all 0.3s ease;

          &:hover {
            cursor: pointer;
            background-color: white;
            color: black;
          }
        }
      }
    }
  }
}
</style>
