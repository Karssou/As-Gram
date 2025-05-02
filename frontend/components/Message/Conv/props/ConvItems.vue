<script lang="ts" setup>
const props = defineProps<{
  className?: string;
  username: string;
  convID: number;
}>();
</script>

<template>
  <div :class="['conv-items', className]">
    <div class="pp"></div>
    <div class="name-info">
      <h1 class="conv-name">{{ username }}</h1>
      <span class="info">salut toi</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.conv-items {
  width: 100%;
  height: 60px;
  max-height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 2%;

  &:hover {
    background-color: $color-panel-secondary;
    cursor: pointer;
  }

  .pp {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: gray;
    margin-right: 10px;
  }
  .name-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: $color-text;
    font-family: "Mulish";
    .conv-name {
      font-size: 1rem;
      font-weight: 600;
    }
    .info {
      font-size: 0.7rem;
      font-weight: 300;
      color: $color-text-secondary;
    }
  }
}
</style>
