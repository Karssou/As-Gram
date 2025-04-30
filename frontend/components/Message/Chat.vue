<script lang="ts" setup></script>

<template>
  <div id="chat-container">
    <section id="chat-header">
      <h1>Salut</h1>
      <p>Je suis la conversation {{}}</p>
    </section>
    <section id="chat-content">
      <ClientOnly>
        <MessageChatList :conversationId="1" />
      </ClientOnly>
    </section>
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
  display: flex;
  flex-direction: column;
  background-color: $color-panel-secondary;
  border-left: 1px solid $color-border;
  border-right: 1px solid $color-border;

  #chat-header {
    flex: 0 0 10%;
    display: flex;
    align-items: center;
    gap: 5px;
    flex-direction: column;
    justify-content: center;
    background-color: red;
  }

  #chat-content {
    flex: 1 1 auto;
    overflow-y: auto;
    width: 100%;
  }

  #chat-footer {
    flex: 0 0 auto;
    padding-bottom: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: transparent;

    & > * {
      width: 80%;
    }
  }
}
</style>
