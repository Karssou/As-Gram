<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const { user } = useUserStore();
const { updateUserInformations} = HandleUser();
const profileForm = ref({ ...user });

const GenderOptions = [
  { value: "male", label: "Homme" },
  { value: "female", label: "Femme" },
  { value: "HOMO", label: "Homosexuel" },
  { value: "Lesb", label: "Lesbienne" },
  { value: "HT", label: "homme trans" },
  { value: "FT", label: "femme trans " },
  { value: "NB", label: "Non-binaire" },
  { value: "GF", label: "Genderfluid" },
  { value: "male", label: "hélicoptère ac130 de combat" },
  { value: "AD", label: "Agender" },
  { value: "BD", label: "Bigender" },
  { value: "DB", label: "Demiboy" },
  { value: "DG", label: "Demigirl" },
  { value: "DR", label: "Droval" },
  { value: "TS", label: "Two-Spirit" },
  { value: "+", label: "autre " },
];

const birthdate = computed({
  get: () =>
    profileForm.value.birthdate
      ? new Date(profileForm.value.birthdate).toISOString().split("T")[0] // "YYYY-MM-DD"
      : "",
  set: (value) => {
    profileForm.value.birthdate = new Date(value).toISOString(); // Convertit en ISO 8601
  },
});

watch(
  () => profileForm.value.birthdate,
  (newValue) => {
    console.log("Valeur modifiée :", newValue);
  }
);
</script>


<template>
  <div id="user-informations-container">
    <div id="user-informations-header">
      <h1>Modifier Vos Informations</h1>
    </div>

    <div id="panel-content">
      <form
        action=""
        id="form-panel"
        @submit.prevent="updateUserInformations(profileForm)"
      >
        <div id="form-content">
          <!-- Modifier le pseudo -->
          <div class="input-container">
            <span class="span-input">Modifier votre pseudo</span>
            <input type="text" v-model="profileForm.username" />
          </div>

          <!-- Nom complet -->
          <div class="input-container">
            <span class="span-input">Nom complet</span>
            <input type="text" v-model="profileForm.fullName" />
          </div>

          <!-- Bio -->
          <div class="input-container">
            <span class="span-input"> Modifier votre bio </span>
            <textarea name="area-bio" v-model="profileForm.biography" />
          </div>

          <!-- Genre -->
          <div class="input-container">
            <span class="span-input">
              Votre genre {{ profileForm.gender }}
            </span>
            <InputsSelectBox
              v-model="profileForm.gender"
              :options="GenderOptions"
              className="input-gender"
            />
          </div>

          <!-- Date de naissance -->
          <div class="input-container">
            <span class="span-input">
              Votre date de naissance : {{ birthdate }}
            </span>
            <input type="date" v-model="birthdate" class="input-birthdate" />
          </div>

          <!-- Email -->
          <div class="input-container">
            <span class="span-input">Votre email</span>
            <input type="email" v-model="profileForm.email" />
          </div>
        </div>

        <!-- Bouton d'enregistrement -->
        <div id="form-footer">
          <button id="send-btn" type="button" @click="Attemptupdate()">Enregistrer</button>

        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss" as *;

#user-informations-container {
  @include gradient-blue-leger;
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
            font-family: "Lato", sans-serif;
            font-size: 16px;
          }

          input {
            min-width: 100px;
            border-radius: 5px;
            padding: 7px 10px;
            border: 1px solid $color-border-discret;
            background-color: $color-panel;
            color: $color-text;
          }

          .input-birthdate {
            width: 300px;
            font-family: "Lato", sans-serif;
            color: white;
            font-size: 16px;
          }

          textarea {
            width: 100%;
            min-width: 100px;
            min-height: 100px;
            padding: 10px;
            border: 1px solid $color-border-discret;
            border-radius: 7px;
            background-color: $color-panel;
            color: $color-text;
            font-family: "Lato", sans-serif;
            resize: none;
          }
        }
      }

      #form-footer {
        width: 100%;
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
