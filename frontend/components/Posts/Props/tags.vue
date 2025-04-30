<script lang="ts" setup>
const props = defineProps<{
  tag: string;
}>();

const emit = defineEmits<{
  (e: "remove", tag: string): void;
}>();

import { icons } from "@/app/utils/icons";
</script>

<template>
  <div class="tag">
    <span>{{ props.tag }}</span>
    <button class="close-btn" @click="emit('remove', props.tag)">
      <component :is="icons['close']" class="close-icon" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.tag {
  width: auto;
  height: 20px;
  border-radius: 40px;
  padding: 0 0px 0 1.5%;
  background-color: rgb(0, 98, 255);
  display: flex;
  align-items: center;
  justify-content: flex-start;

  span {
    font-size: 0.8rem;
    font-family: "Ubuntu";
    color: $color-text;
    line-height: 1;
    margin-right: auto;
  }

  .close-btn {
    background: none;
    border: none;

    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .close-icon {
      color: $color-text;
      font-size: 1rem;
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
