<script lang="ts" setup>
import { icons } from "@/app/utils/icons";

defineProps<{
  className?: string;
  modelValue?: string | number | undefined;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();
</script>

<template>
  <div :class="['input-container', className]">
    <input
      class="date-input"
      type="date"
      max="2025-12-31"
      :value="modelValue"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <component
      :is="icons['calendar']"
      v-if="icons['calendar']"
      id="date-icon"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.input-container {
  min-width: fit-content;
  width: 100%;
  height: 50px;
  position: relative;

  .date-input {
    width: 100%;
    height: 100%;
    background-color: $color-panel;
    border-radius: 7px;
    border: 1px solid $color-border-discret;
    padding: 5px 10px;
    color: $color-text;
    font-family: "Lato";

    &::-webkit-calendar-picker-indicator {
      opacity: 0;
      display: none;
    }
  }

  #date-icon {
    position: absolute;
    color: $color-text;
    font-size: 1.3rem;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
