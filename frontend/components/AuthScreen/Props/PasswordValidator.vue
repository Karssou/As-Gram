<script lang="ts" setup>
import { icons } from "@/app/utils/icons";

const props = defineProps<{
  password: string;
}>();

const emit = defineEmits<{
  (e: "validity", value: boolean): void;
}>();

const HasMaj = ref(false);
const HasMin = ref(false);
const HasDigit = ref(false);
const HasSpe = ref(false);

const validatePassword = () => {
  HasMaj.value = /[A-Z]/.test(props.password);
  HasMin.value = /[a-z]/.test(props.password);
  HasDigit.value = /\d/.test(props.password);
  HasSpe.value = /[!@#$%^&*(),.?":{}|<>]/.test(props.password);

  const isValid =
    HasMaj.value && HasMin.value && HasDigit.value && HasSpe.value;
  emit("validity", isValid);
};

watch(() => props.password, validatePassword, { immediate: true });
</script>

<template>
  <section class="password-validator">
    <ul class="valid-list">
      <li class="criteria">
        <component
          v-if="props.password.length <= 8"
          :is="icons['close']"
          class="icon-invalid"
        />
        <component v-else :is="icons['check']" class="icon-valid" />
        <span>Au moins 8 caractères</span>
      </li>
      <li class="criteria">
        <component v-if="!HasMaj" :is="icons['close']" class="icon-invalid" />
        <component v-else :is="icons['check']" class="icon-valid" />
        <span>Au moins une majuscule</span>
      </li>
      <li class="criteria">
        <component v-if="!HasMin" :is="icons['close']" class="icon-invalid" />
        <component v-else :is="icons['check']" class="icon-valid" />
        <span>Au moins une minuscule</span>
      </li>
      <li class="criteria">
        <component v-if="!HasDigit" :is="icons['close']" class="icon-invalid" />
        <component v-else :is="icons['check']" class="icon-valid" />
        <span>Au moins un chiffre</span>
      </li>
      <li class="criteria">
        <component v-if="!HasSpe" :is="icons['close']" class="icon-invalid" />
        <component v-else :is="icons['check']" class="icon-valid" />
        <span>Au moins un caractère spécial (# @ ...)</span>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.password-validator {
  width: auto;
  padding: 15px 10px;
  height: fit-content;
  background-color: $color-panel;
  border-radius: 12px;
  border: 2px solid $color-border-discret;

  .valid-list {
    width: 100%;
    height: 100%;
    display: flex;

    flex-direction: column;
    gap: 10px;
    .criteria {
      display: flex;
      align-items: center;

      span {
        color: $color-text;
        font-family: "Lato";
        font-size: 0.9rem;
      }

      .icon-invalid {
        color: $color-warning;
        margin-right: 10px;
      }

      .icon-valid {
        color: $color-success;
        margin-right: 10px;
      }
    }
  }
}
</style>
