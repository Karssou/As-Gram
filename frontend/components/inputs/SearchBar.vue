<script lang="ts" setup>
import { icons } from "@/app/utils/icons";

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: "Rechercher...",
  },
});

const emit = defineEmits(["update:modelValue", "search"]); // Événement pour maj le modèle et trigger la recherche

const clearSearch = () => {
  emit("update:modelValue", "");
};
</script>

<template>
  <div id="search-container">
    <input
      type="search"
      id="search-bar"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <component :is="icons['search']" v-if="icons['search']" id="search-icon" />
    <button id="close-btn" v-if="modelValue" @click="clearSearch">
      <component :is="icons['close']" v-if="icons['close']" id="close-icon" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#search-container {
  min-width: 150px;
  min-height: auto;
  height: auto;
  max-height: 50px;
  display: flex;
  align-items: center;

  position: relative;

  #search-bar {
    padding: 5px 10px 5px 15%;
    width: 100%;
    height: 100%;
    border-radius: 7px;
    border: 1px solid $color-border-discret;
    background-color: $color-panel;
    color: $color-text;

    ::-webkit-search-cancel-button {
      display: none;
    }
  }

  #search-icon {
    color: $color-text;
    position: absolute;
    left: 3%;
  }

  #close-btn {
    position: absolute;
    height: fit-content;
    width: fit-content;
    right: 3%;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    #close-icon {
      color: $color-text;
      transition: color 0.2s ease;
    }

    &:hover {
      cursor: pointer;

      #close-icon {
        color: $color-warning;
      }
    }
  }
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
</style>
