<script lang="ts" setup>
import { InputsTextInput } from "#components";
import { icons } from "@/app/utils/icons";

const { register } = HandleAuth();

const UserName = ref("");
const UserEmail = ref("");
const UserPassword = ref("");
const passwordvalid = ref(false);

const isFormValid = computed(() => {
  const EmailOK = UserEmail.value.length > 0;
  const UserNameOK = UserName.value.length > 3;
  return EmailOK && passwordvalid.value && UserNameOK;
});

const AttemptRegister = async () => {
  const payload = {
    email: UserEmail.value,
    username: UserName.value,
    password: UserPassword.value,
  };

  const request: any = await register(payload);

  console.info(request);
};
</script>

<template>
  <section class="login-screen">
    <form class="login-form" @submit.prevent="AttemptRegister">
      <div id="user">
        <section class="label">
          <component :is="icons['user']" id="user-icon" class="icons" />
          <span>Nom d'utilisateur</span>
        </section>
        <InputsTextInput
          placeholder="Pseudonyme"
          type="text"
          v-model="UserName"
          class="input"
        />
      </div>
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
        <Transition name="pw-validator">
          <AuthScreenPropsPasswordValidator
            v-show="UserPassword.length > 0"
            :password="UserPassword"
            @validity="passwordvalid = $event"
          />
        </Transition>
      </div>
      <section class="submit">
        <button
          type="submit"
          class="submit-btn"
          :class="{ 'btn-disabled': !isFormValid }"
          :disabled="!isFormValid"
          @submit="AttemptRegister"
        >
          <component :is="icons['login']" id="submit-icon" />
          <span>Se connecter</span>
        </button>
      </section>
    </form>
  </section>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

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
