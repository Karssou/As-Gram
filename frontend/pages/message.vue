<template>
  <main>
    <MessagePaneltest />
    <h1>MESSAGE TEST</h1>
    <div id="content">
      <span>ID CONVERSATION</span>
      <input type="text" v-model="conv" placeholder="ID conversation" />
      <input type="text" v-model="messageid" placeholder="ID Message" />
      <input
        type="text"
        v-model="ModifiedMessage"
        placeholder="Contenu Modifié"
      />
      <input type="text" v-model="message" placeholder="Ecrire un Message" />
      <button @click="attemptsend(conv, message)">Envoyer</button>
      <button @click="attemptget(conv)">Tous les messages</button>
      <button @click="attemptedit(messageid, ModifiedMessage)">
        Changer le message
      </button>

      <pre>{{ response.data }}</pre>
    </div>
  </main>
</template>

<script setup lang="ts">
const conv = ref();
const message = ref();
const messageid = ref();
const response: any = ref("");
const ModifiedMessage = ref("");

const { getMessages, sendMessage, EditMessage } = useMessage();

const attemptget = async (conversationId: number) => {
  const req = await getMessages(conversationId);
  response.value = await req;
};

const attemptsend = async (conversationId: number, content: string) => {
  const req = await sendMessage(conversationId, content);
  message.value = "";
  response.value = await req;
};

const attemptedit = async (messageId: number, modifiedContent: string) => {
  const res = await EditMessage(messageId, modifiedContent);
  response.value = await res;
};
</script>

<style scoped lang="scss">
pre {
  max-width: 10%;
  background-color: white;
}

h1 {
  text-align: center;
  color: white;
  font-family: "Mulish";
  font-weight: 900;
  font-size: 32px;
  margin-top: 30px;
}

#content {
  padding-top: 2%;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100%;
  gap: 15px;

  span {
    color: white;
    font-weight: 600;
  }

  input,
  button {
    padding: 5px 10px;
  }
}
</style>
