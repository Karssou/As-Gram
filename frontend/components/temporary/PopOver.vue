<script lang="ts" setup>
import { ref } from "vue";

defineProps({
  message: {
    type: String,
    required: true,
  },

  className: {
    type: String,
  },
});

const popoverVisible = ref(false);

const showPopover = () => (popoverVisible.value = true);
const hidePopover = () => (popoverVisible.value = false);
</script>

<template>
  <div
    class="popover-container"
    @mouseenter="showPopover"
    @mouseleave="hidePopover"
  >
    <slot></slot>

    <div v-if="popoverVisible" :class="['menu-container', className]">
      <div id="menu-content">
        <span id="menu-span">{{ message }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.popover-container {
  position: relative;
  width: fit-content;
  display: inline-block;
}

.menu-container {
  position: absolute;
  top: 106%;
  transform: translateX(-70%);
  left: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: fit-content;
  min-width: 80px;
  padding: 0 5px;
  max-width: 500px;
  min-height: 30px;
  background-color: $color-black;
  border-radius: 7px;
  z-index: 98;
  transition: opacity 0.2s ease-in-out;
  opacity: 0;
  pointer-events: none;
  user-select: none;

  .popover-container:hover & {
    opacity: 1;
    pointer-events: auto;
  }

  &::before {
    position: absolute;
    left: 50%;
    bottom: 90%;
    content: "";
    width: 7px;
    height: 7px;
    transform: rotate(45deg);
    background-color: $color-black;
    z-index: 96;
    border-radius: 20%;
  }

  #menu-content {
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    min-height: 30px;

    #menu-span {
      color: white;
      font-family: "Inter";
      font-size: 12px;
      font-weight: 500;
    }
  }
}
</style>
