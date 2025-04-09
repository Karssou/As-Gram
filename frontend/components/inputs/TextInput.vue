<script setup lang="ts">
defineProps<{
  className?: string;
  ModelValue?: string | number | undefined;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();
</script>

<template>
  <div :class="['input-container', className]">
    <input
      type="text"
      :placeholder="placeholder"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.input-container {
  input {
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    background-color: $color-panel;
    border: 1px solid $color-border-discret;
    border-radius: 7px;
    color: $color-text;
    font-family: "Lato";

    &::placeholder {
      color: $color-text-disabled;
      font-family: "Lato";
    }
  }
}
</style>
