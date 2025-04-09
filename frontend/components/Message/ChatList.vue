<script lang="ts" setup>
const { pusher } = usePusher();

const props = defineProps<{
  conversationId: number;
}>();

import { formatRelativeTime } from "@/app/utils/FormatDate";

const { user } = useUserStore();
const { getMessages } = useMessage();

const messages = ref<Message[]>();

onMounted(async () => {
  const req: any = await getMessages(1);
  console.log(req);
  messages.value = req;
  

  const channel = pusher.subscribe(`conversation-1`);
  channel.bind("new-message", (message: Message) => {
    console.log("[PUSHER] Nouveau message reçu :", message);
    if (messages.value) {
      messages.value.push(message);
    }
  });
});

onUnmounted(() => {
  pusher.unsubscribe(`conversation-1`);
});





</script>

<template>
  <div id="message-container">
    <ClientOnly>
      <ul id="message-list">
        <TransitionGroup name="bubble">
          <li
            class="message"
            :class="{
              sent: message.senderId === user?.id,
              received: message.senderId !== user?.id,
            }"
            v-for="message in messages"
            :key="message.id"
          >
            <MessagePropsBubble
              :message="message.content"
              :timestamp="formatRelativeTime(message.createdAt)"
              :sender="message.senderId === user?.id"
              :id="message.id"
              :timestamp-update="message.updatedAt"
              :reactions="message.reactions"
            />
          </li>
        </TransitionGroup></ul
    ></ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  width: 20px;
  height: 20px;
}

.bubble-enter-active,
.bubble-leave-active {
  transition: transform 0.4s ease;
}

.sent {
  transform-origin: top right;
}

.received {
  transform-origin: top left;
}

.bubble-enter-from,
.bubble-leave-to {
  transform: scale(0);
}

.bubble-enter-to,
.bubble-leave-from {
  transform: scale(1);
}

.button {
  width: 20%;
  align-self: center;
  padding: 10px 5px;
  border-radius: 7px;
  border: none;
  display: flex;
  justify-content: center;
}

#message-container {
  width: 100%;
  height: 100%;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  scrollbar-arrow-color: transparent;

  #message-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 5% 2%;
    overflow-y: auto;
    padding-bottom: 15px;

    .message {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 60px;
      padding: 1% 0;
      min-height: auto;
    }
  }
}
</style>
