<script lang="ts" setup>
import { InputsTextInput } from "#components";
import { icons } from "@/app/utils/icons";

const { login, formatValidationErrors } = HandleAuth();

const UserEmail = ref("");
const UserPassword = ref("");
const PendingConnection = ref(false);
const formErrors = ref();

const isFormValid = computed(() => {
  const EmailOK = UserEmail.value.length > 0;
  const PWOK = UserPassword.value.length > 3;
  return EmailOK && PWOK;
});

const AttemptRegister = async () => {
  const payload = {
    email: UserEmail.value,
    password: UserPassword.value,
  };

  PendingConnection.value = true;

  const request = await login(payload);

  formErrors.value = formatValidationErrors(request);

  PendingConnection.value = false;
};
</script>

<template>
  <section class="login-screen">
    <form class="login-form" @submit.prevent="AttemptRegister">
      <div id="email">
        <section class="label">
          <component :is="icons['email']" id="mail-icon" class="icons" />
          <span>Email</span>
        </section>
        <InputsTextInput
          placeholder="Email"
          type="email"
          v-model="UserEmail"
          class="input"
        />
      </div>
      <div id="password">
        <section class="label">
          <component :is="icons['password']" id="password-icon" class="icons" />
          <span>Mot de passe</span>
        </section>
        <InputsTextInput
          placeholder="Mot de passe"
          type="password"
          v-model="UserPassword"
          class="input"
        />
      </div>
      <section class="submit">
        <p>{{ formErrors }}</p>
        <button
          type="submit"
          class="submit-btn"
          :class="{ 'btn-disabled': !isFormValid }"
          :disabled="!isFormValid"
          @submit="AttemptRegister"
        >
          <component :is="icons['login']" id="submit-icon" />
          <span>Se connecter</span
          ><LoadingWheel className="loading" v-if="PendingConnection" />
        </button>
      </section>
    </form>
  </section>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.loading {
  width: 20px;
  border-width: 2px;
  height: 20px;
}

.pw-validator-enter-active,
.pw-validator-leave-active {
  transition: all 0.3s ease-out;
}

.pw-validator-enter-from,
.pw-validator-leave-to {
  transform: translateY(-20px);

  opacity: 0;
}

.pw-validator-leave-from,
.pw-validator-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.login-screen {
  width: 100%;
  height: 100%;
  .login-form {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 25px;
    .icons {
      color: $color-text;
      font-size: 1.2rem;
    }

    .label {
      display: flex;
      gap: 7px;

      span {
        color: $color-text;
        font-family: "Lato";
      }
    }

    #user {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 50%;
    }
    #email {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 50%;
    }

    #password {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 50%;
    }

    .submit {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 5px;

      .submit-btn {
        background-color: transparent;
        border: 1px solid $color-text;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 10px;
        transition: all 0.125s ease;

        &.btn-disabled {
          border-color: grey;
          cursor: not-allowed;
          pointer-events: none;

          span {
            color: grey;
          }

          #submit-icon {
            color: grey;
          }
        }

        span {
          color: $color-text;
          font-size: 1rem;
          font-weight: 600;
          font-family: "Lato";
        }
        #submit-icon {
          color: $color-text;
          font-size: 1.1rem;
          margin-right: 5px;
        }

        &:hover {
          cursor: pointer;
          background-color: $color-text;

          span {
            color: black;
          }

          #submit-icon {
            color: black;
          }
        }
      }
    }
  }
}
</style>
