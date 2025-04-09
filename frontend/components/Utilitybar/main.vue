<script lang="ts" setup>
import { icons } from "@/app/utils/icons";

const isshow = ref(true);
</script>

<template>
  <div id="utility-bar">
    <button id="utility-btn" @click="isshow = !isshow">
      <component v-if="!isshow" :is="icons['settings']" id="icon-utility" />
      <component v-else :is="icons['close']" id="icon-utility" />
    </button>
    <Transition name="popup">
      <div id="utility-tab" v-if="isshow">
        <div id="utility-header">
          <UtilitybarNav />
        </div>
        <div id="utility-content"></div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.popup-enter-active,
.popup-leave-active {
  transform-origin: top left;
  transition: transform 0.2s ease-out;
}
.popup-enter-to,
.popup-leave-from {
  transform: scale(1);
}

.popup-enter-from,
.popup-leave-to {
  transform: scale(0);
}

#utility-bar {
  border-radius: 12px;
  transition: all 0.5s ease;
  transform-origin: top right;
  position: relative;
}

#utility-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 2px solid $color-border;
  transition: all 0.25s ease;

  &:hover {
    cursor: pointer;
    background-color: $color-border;

    #icon-utility {
      color: $color-panel;
    }
  }

  #icon-utility {
    color: $color-text;
    font-size: 200%;
    transition: all 0.2s ease;
  }
}

#utility-tab {
  position: absolute;
  top: 90%;
  left: 90%;
  width: 500px;
  height: 500px;
  background-color: $color-panel;
  border-radius: 10px;
  border: 1px solid $color-border;
  display: flex;
  flex-direction: column;

  #utility-header {
    flex: 1 1 15%;
  }

  #utility-content {
    flex: 2 1 85%;
  }
}
</style>
