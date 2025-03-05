<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button id="button">
    <span class="span-btn">{{ text }}</span>
  </button>
</template>

<style lang="scss" scoped>
@use "button.scss";
</style>
