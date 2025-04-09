<script lang="ts" setup>
import Chat from "~/components/Message/Chat.vue";

const bonjour = () => console.log("Bonjour");

const isTyping = ref(false);

const Emoji = ref();

const ellipsisOptions = [
  {
    label: "Bonjour",
    OnClick: () => {
      bonjour();
    },
  },
  {
    label: "Aurevoir",
    icon: "send",
    OnClick: () => {
      console.log("Aurevoir");
    },
  },
];

function handleEmojiSelect(emoji: any) {
  Emoji.value = emoji;
}
</script>

<template>
  <main>
    <PostsPostItems />
  </main>
</template>

<style lang="scss" scoped>
@use "styles/laboratory.scss";

.salut {
  width: 25px;
  height: 25px;
}

.button {
  color: whitesmoke;
  background-color: transparent;
  border: 1px solid whitesmoke;
  padding: 10px 20px;
  border-radius: 7px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: whitesmoke;
    color: black;
  }
}
</style>
