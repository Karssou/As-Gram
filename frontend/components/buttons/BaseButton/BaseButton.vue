<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

const { salut } = HandleAuth();
</script>

<template>
  <button id="button" @click="salut">
    <span class="span-btn">{{ text }}</span>
  </button>
</template>

<style lang="scss" scoped>
@use "button.scss";
</style>
