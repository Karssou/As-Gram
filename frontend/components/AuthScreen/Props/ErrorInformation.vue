<script lang="ts" setup>
import { icons } from "@/app/utils/icons";

const props = defineProps<{
  message: string;
}>();
</script>

<template>
  <Transition name="fade-error">
    <section class="error-container">
      <component :is="icons['close']" class="close-icon" />
      <span> {{ props.message }}</span>
    </section>
  </Transition>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
.fade-error-enter-active,
.fade-error-leave-active {
  transition: all 0.2s ease-out;
}

.fade-error-leave-from,
.fade-error-enter-to {
  opacity: 1;
}

.fade-error-leave-to,
.fade-error-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.error-container {
  
  @include gradient-warning;
  min-width: 150px;
  width: fit-content;
  min-height: 30px;
  height: auto;
  padding: 5px 10px 5px 6px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .close-icon {
    color: $color-text;
    font-size: 1.3rem;
    margin-right: 5px;
  }

  span {
    font-size: 1rem;
    line-height: 0;
    color: $color-text;
    font-family: "Ubuntu";
    font-weight: 400;
    pointer-events: none;
    user-select: none;
  }
}
</style>
