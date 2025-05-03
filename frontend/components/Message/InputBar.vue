<script lang="ts" setup>
import { icons } from "@/app/utils/icons";
import PopOver from "../Shared/PopOver.vue";
import Pusher from "pusher-js";

const { sendTypingEvent } = usePusher();
const { sendMessage } = useMessage();

const message = ref("");
const conversationId = ref(1);

const isTyping = ref(false);
const typingTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

const emit = defineEmits<{
  (e: "update:isTyping", value: boolean): void;
}>();

function handleTyping() {
  if (!isTyping.value) {
    isTyping.value = true;
    emit("update:isTyping", true);
    sendTypingEvent(conversationId.value, 1);
  }

  if (typingTimeout.value) clearTimeout(typingTimeout.value);
  typingTimeout.value = setTimeout(() => {
    isTyping.value = false;
    emit("update:isTyping", false);
  }, 2000);
}

const typingUser = ref("");
const remoteTypingTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

const pusher = new Pusher("1824230dd5421145621d", {
  cluster: "eu",
});

const channel = pusher.subscribe(`conversation-${conversationId.value}`);

channel.bind("user-typing", (data: any) => {
  typingUser.value = data.userId;

  if (remoteTypingTimeout.value) clearTimeout(remoteTypingTimeout.value);
  remoteTypingTimeout.value = setTimeout(() => {
    typingUser.value = "";
  }, 2000);
});
</script>

<template>
  <div id="input-bar-container">
    <pop-over message="Joindre un fichier" class-name="position">
      <button id="plus-btn">
        <component :is="icons['plus']" id="plus-icon" />
      </button>
    </pop-over>
    <textarea
      name="input-message"
      id="input-message"
      placeholder="Ecrire un message"
      @input="handleTyping"
      v-model="message"
    />

    <button
      type="submit"
      @click="sendMessage(conversationId, message)"
      id="send-btn"
    >
      <component :is="icons['send']" id="send-icon" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.position {
  transform: translateX(-80%);
}

#input-bar-container {
  width: 100%;
  height: auto;
  max-height: 500px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: $color-panel;
  border-radius: calc(25px + 10px * (var(--height, 1) - 1));
  padding: 5px 1%;

  #plus-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 40px;
    width: 35px;
    height: 35px;
    max-width: 35px;
    max-height: 35px;
    border-radius: 50%;
    background-color: transparent;
    border: none;
    margin-right: 10px;
    position: relative;
    transition: all 0.125s ease;
    margin-top: auto;

    #plus-icon {
      color: $color-text;
      font-size: 200%;
      font-weight: 900;
      transition: color 0.25s ease;
    }

    &::before {
      position: absolute;
      top: 10%;
      left: 110%;
      content: "";
      height: 80%;
      width: 1px;
      background: white;
    }

    &:hover {
      cursor: pointer;
      background-color: $color-panel-secondary;
    }
  }
  #input-message {
    flex: 1 1 90%;
    display: flex;
    max-height: inherit;
    background-color: transparent;
    border: none;
    outline: none;
    resize: none;
    field-sizing: content;
    color: $color-text;
    font-family: "Mulish";

    &::placeholder {
      font-family: "Mulish";
      font-size: 0.9rem;
    }
  }

  #send-btn {
    flex: 1 1 40px;
    margin-top: auto;
    height: 35px;
    width: 35px;
    max-width: 35px;
    max-height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid $color-border-discret;
    background-color: transparent;
    transition: background 0.25s ease;

    &:hover {
      cursor: pointer;
      background-color: $color-panel-secondary;
    }

    #send-icon {
      margin-left: 2px;
      color: white;
      font-size: 150%;
    }
  }
}
</style>
<script lang="ts" setup>
import { icons } from "@/app/utils/icons";
import PopOver from "../Shared/PopOver.vue";
import Pusher from "pusher-js";

const { sendTypingEvent } = usePusher();
const { sendMessage } = useMessage();

const message = ref("");
const conversationId = ref(3);

const isTyping = ref(false);
const typingTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

const emit = defineEmits<{
  (e: "update:isTyping", value: boolean): void;
}>();

function handleTyping() {
  if (!isTyping.value) {
    isTyping.value = true;
    emit("update:isTyping", true);
    sendTypingEvent(conversationId.value, 1);
  }

  if (typingTimeout.value) clearTimeout(typingTimeout.value);
  typingTimeout.value = setTimeout(() => {
    isTyping.value = false;
    emit("update:isTyping", false);
  }, 2000);
}

const typingUser = ref("");
const remoteTypingTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

const pusher = new Pusher("1824230dd5421145621d", {
  cluster: "eu",
});

const channel = pusher.subscribe(`conversation-${conversationId.value}`);

channel.bind("user-typing", (data: any) => {
  typingUser.value = data.userId;

  if (remoteTypingTimeout.value) clearTimeout(remoteTypingTimeout.value);
  remoteTypingTimeout.value = setTimeout(() => {
    typingUser.value = "";
  }, 2000);
});
</script>

<template>
  <div id="input-bar-container">
    <pop-over message="Joindre un fichier" class-name="position">
      <button id="plus-btn">
        <component :is="icons['plus']" id="plus-icon" />
      </button>
    </pop-over>
    <textarea
      name="input-message"
      id="input-message"
      placeholder="Ecrire un message"
      @input="handleTyping"
      v-model="message"
    />

    <button
      type="submit"
      @click="sendMessage(conversationId, message)"
      id="send-btn"
    >
      <component :is="icons['send']" id="send-icon" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.position {
  transform: translateX(-80%);
}

#input-bar-container {
  width: 100%;
  height: auto;
  max-height: 500px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: $color-panel;
  border-radius: calc(25px + 10px * (var(--height, 1) - 1));
  padding: 5px 1%;

  #plus-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 40px;
    width: 35px;
    height: 35px;
    max-width: 35px;
    max-height: 35px;
    border-radius: 50%;
    background-color: transparent;
    border: none;
    margin-right: 10px;
    position: relative;
    transition: all 0.125s ease;
    margin-top: auto;

    #plus-icon {
      color: $color-text;
      font-size: 200%;
      font-weight: 900;
      transition: color 0.25s ease;
    }

    &::before {
      position: absolute;
      top: 10%;
      left: 110%;
      content: "";
      height: 80%;
      width: 1px;
      background: white;
    }

    &:hover {
      cursor: pointer;
      background-color: $color-panel-secondary;
    }
  }
  #input-message {
    flex: 1 1 90%;
    display: flex;
    max-height: inherit;
    background-color: transparent;
    border: none;
    outline: none;
    resize: none;
    field-sizing: content;
    color: $color-text;
    font-family: "Mulish";

    &::placeholder {
      font-family: "Mulish";
      font-size: 0.9rem;
    }
  }

  #send-btn {
    flex: 1 1 40px;
    margin-top: auto;
    height: 35px;
    width: 35px;
    max-width: 35px;
    max-height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid $color-border-discret;
    background-color: transparent;
    transition: background 0.25s ease;

    &:hover {
      cursor: pointer;
      background-color: $color-panel-secondary;
    }

    #send-icon {
      margin-left: 2px;
      color: white;
      font-size: 150%;
    }
  }
}
</style>
