<script lang="ts" setup>
import { icons } from "@/app/utils/icons";
const { postMessageReaction } = useMessage();
const { user } = storeToRefs(useUserStore());
const userId = user.value!.id;

const props = defineProps<{
  className?: string;
  messageId: number;
}>();

const emojis = [
  { name: "heart", icon: "emoji_heart" },
  { name: "like", icon: "emoji_like" },
  { name: "smile", icon: "emoji_smile" },
  { name: "laugh", icon: "emoji_laugh" },
];

const panelEmoji = ref(false);
</script>

<template>
  <button :class="['emoji-btn', className]" @click="panelEmoji = !panelEmoji">
    <component :is="icons['emoji']" class="btn-icon" />
    <Transition name="panel">
      <div v-if="panelEmoji" id="panel-emoji">
        <button
          v-for="emoji in emojis"
          class="emoji-choice"
          @click="postMessageReaction(props.messageId, emoji.name, userId)"
        >
          <component
            :is="icons[emoji.icon]"
            v-if="icons[emoji.icon]"
            class="emoji-icon"
          />
        </button>
      </div>
    </Transition>
  </button>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.panel-enter-active,
.panel-leave-active {
  transition: transform 0.1s ease-out;
  transform-origin: left top;
}

.panel-enter-from,
.panel-leave-to {
  transform: scale(0);
}

.panel-enter-to,
.panel-leave-from {
  transform: scale(1);
}

.emoji-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  padding: 0;
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  transition: all 0.125s ease;
  border-radius: 7px;
  position: relative;

  .btn-icon {
    color: $color-text;
    font-size: larger;
    transition: all 0.125s ease;
  }

  &:hover {
    cursor: pointer;
    background-color: rgba(244, 244, 244, 0.5);

    .btn-icon {
      color: black;
    }
  }
}

#panel-emoji {
  position: absolute;
  left: 90%;
  top: 90%;
  background-color: $color-panel;
  border: 1px solid $color-border-discret;
  min-width: 15px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  border-radius: 12px;
  z-index: 200;

  .emoji-choice {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    border-radius: 30%;

    &:hover {
      cursor: pointer;
      background-color: $color-text;
    }

    .emoji-icon {
      flex-shrink: 0;
      font-size: larger;
      color: white;
    }
  }
}
</style>
