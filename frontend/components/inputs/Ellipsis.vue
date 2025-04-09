<script lang="ts" setup>
import { icons } from "@/app/utils/icons";

const props = defineProps<{
  className?: string;
  options: {
    label: string;
    icon?: string;
    OnClick: () => void;
  }[];
}>();

const showActionMenu = ref(false);
</script>

<template>
  <button
    @click="showActionMenu = !showActionMenu"
    :class="['more-btn', className]"
    @blur="showActionMenu = false"
  >
    <component :is="icons['ellipsis']" id="ellipsis-icon" />
    <Transition name="action-menu">
      <div v-if="showActionMenu" id="ellipsis-panel">
        <button
          @click="option.OnClick"
          v-for="option in props.options"
          class="ellipsis-choice"
        >
          <component
            id="icon-action"
            v-if="option.icon && icons[option.icon]"
            :is="icons[option.icon]"
          />
          <span>{{ option.label }}</span>
        </button>
      </div></Transition
    >
  </button>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.action-menu-enter-active,
.action-menu-leave-active {
  transition: transform 0.1s ease-out;
  transform-origin: top left;
}

.action-menu-enter-from,
.action-menu-leave-to {
  transform: scale(0);
}

.action-menu-enter-to,
.action-menu-leave-from {
  transform: scale(1);
}

.more-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  display: flex;
  place-items: center;
  background-color: transparent;
  transition: background 0.2s ease;
  position: relative;
  &:hover {
    cursor: pointer;
    background-color: $color-text;

    #ellipsis-icon {
      color: black;
    }
  }

  #ellipsis-icon {
    transition: background 0.3s ease;
    font-size: 200%;
    color: white;
  }
}

#ellipsis-panel {
  background-color: $color-panel;
  border: 1px solid $color-border-discret;
  position: absolute;
  left: 96%;
  top: 96%;
  padding: 3px 1px;

  min-height: 30px;
  width: auto;
  height: auto;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  .ellipsis-choice {
    width: 100%;
    min-height: 30px;
    height: auto;
    padding: 7px 15px;
    background-color: transparent;
    border: none;
    display: flex;
    place-items: center;
    justify-content: center;
    border-radius: 7px;

    #icon-action {
      font-size: larger;
      color: $color-text;
      margin-right: 5px;
    }
    span {
      color: $color-text;
      font-family: "Mulish";
      font-size: 1rem;
    }

    &:hover {
      cursor: pointer;
      background-color: whitesmoke;

      #icon-action {
        color: black;
      }
      span {
        color: black;
      }
    }
  }
}
</style>
