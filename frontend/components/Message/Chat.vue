<script lang="ts" setup></script>

<template>
  <div id="chat-container">
    <section id="chat-header"></section>
    <section id="chat-content"></section>
    <section id="chat-footer">
      <MessageInputBar />
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#chat-container {
  width: 800px;
  height: 100vh;
  background-color: $color-panel-secondary;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border-right: 1px solid $color-border;
  border-left: 1px solid $color-border;

  #chat-footer {
    width: 80%;
    height: 50px;
  }
}
</style>
