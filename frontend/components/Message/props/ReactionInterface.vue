<script lang="ts" setup>
import { icons } from "@/app/utils/icons";

const props = defineProps<{
  Reactions: MessageReactions[];
  className: string;
}>();

const emojiList: any = {
  smile: "emoji_smile",
  laugh: "emoji_laugh",
  heart: "emoji_heart",
  like: "emoji_like",
};





</script>

<template>
  <div :class="['reactions-container', className]">
    <TransitionGroup name="emoji">
      <div
        v-for="emoji in props.Reactions"
        class="emoji-items"
        :key="emoji.userId"
      >
        <component
          :is="icons[emojiList[emoji.emoji]]"
          v-if="emoji.emoji"
          class="emoji-icon"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.emoji-enter-active,
.emoji-leave-active {
  transition: transform 0.1s ease-out;
  transform-origin: center;
}

.emoji-enter-from,
.emoji-leave-to {
  transform: scale(0);
}

.emoji-enter-to,
.emoji-leave-from {
  transform: scale(1);
}

.reactions-container {
  width: fit-content;
  max-width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 2px;
  background-color: $color-panel-secondary;
  border: 2px solid $color-border;
  border-radius: 50%;
  padding: 4px 3px;
  transition: border-radius 0.3s ease;

  &:not([style*="width: 100px"]) {
    border-radius: 40px;
  }

  .emoji-items {
    flex-wrap: nowrap;
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
