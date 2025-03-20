<script lang="ts" setup>
import { icons } from "@/app/utils/icons";

defineProps<{
  modelValue: string | number | null;
  options: { value: string | number; label: string }[];
  label?: string;
  placeholder?: string;
  className?: string;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="select-container">
    <label v-if="label" class="select-label">{{ label }}</label>
    <div class="select-wrapper">
      <select
        :class="['select-box', className]"
        :value="modelValue"
        @change="
          emit('update:modelValue', ($event.target as HTMLSelectElement).value)
        "
      >
        <option value="" disabled selected hidden>
          {{ placeholder || "Sélectionnez" }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option></select
      ><component
        :is="icons['arrowbottom']"
        class="custom-arrow"
        v-if="icons['arrowbottom']"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.select-container {
  display: flex;
  flex-direction: column;
  gap: 12px;

  position: relative;
  max-width: 200px;
}

.select-label {
  font-weight: bold;
  font-size: 12px;
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.select-box {
  appearance: none;
  padding: 7px 10px;
  border: 1px solid $color-border-discret;
  border-radius: 7px;
  background: $color-panel;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  color: $color-text;
}

/* Nouvelle flèche */
.custom-arrow {
  position: absolute;
  right: 5%;
  font-size: 24px;
  color: $color-text;
  transform-origin: center;
  transition: transform 0.3s ease;
}

.select-box:focus-within + .custom-arrow {
  transform: rotate(180deg);
}
</style>
