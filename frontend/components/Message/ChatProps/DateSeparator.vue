<script lang="ts" setup>
const props = defineProps({
  date: {
    type: String,
    required: true,
  },
});

import { formatRelative, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
const formattedDate = computed(() => {
  return formatRelative(parseISO(props.date), new Date(), { locale: fr });
});
</script>

<template>
  <div id="date-separator">
    <div class="line"></div>
    <div id="content">
      <span id="date">{{ formattedDate }}</span>
    </div>
    <div class="line"></div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#date-separator {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 10px; // Ajoute un peu d'espace entre les éléments

  #content {
    padding: 4px 10px;
  }

  #date {
    color: black;
    font-size: 0.85rem;
    font-family: "Lato";
    font-weight: bold;
    white-space: nowrap;
    text-transform: capitalize;
  }

  .line {
    flex-grow: 1;
    height: 2px;
    background-color: $color-text;
  }
}
</style>
