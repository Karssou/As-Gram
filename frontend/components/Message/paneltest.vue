<script setup>
import { ref } from "vue";

const apiBaseUrl = "http://localhost:3333"; // Modifie selon ton URL backend
const {
  createConversation,
  deleteConversation,
  getUserFromConversation,
  addUserToConversation,
  isUserInConversation,
  deleteUserFromConversation,
} = UseConversation();

const userIds = ref("");
const conversationId = ref("");
const userId = ref("");
const responseMessage = ref("");

const AttemptcreateConversation = async () => {
  const user_Ids = userIds.value.split(",").map((id) => Number(id.trim()));
  const result = await createConversation(user_Ids);
  responseMessage.value = result;
};

const AttemptdeleteConversation = async () => {
  const result = await deleteConversation(conversationId.value);
  responseMessage.value = await result;
};

const AttemptaddUserToConversation = async () => {
  const result = await addUserToConversation(
    conversationId.value,
    userId.value
  );
  responseMessage.value = await result;
};

const AttemptUsersFromConversation = async () => {
  const result = await getUserFromConversation(conversationId.value);
  responseMessage.value = result;
};

const checkUserInConversation = async () => {
  const res = await isUserInConversation(conversationId.value, userId.value);
  responseMessage.value = await res;
};

const removeUserFromConversation = async () => {
  const result = await deleteUserFromConversation(
    conversationId.value,
    userId.value
  );
  responseMessage.value = result;
};
</script>

<template>
  <div class="container">
    <h2>Tester les Conversations</h2>

    <div class="form-group">
      <label>IDs des utilisateurs (séparés par des virgules)</label>
      <input v-model="userIds" placeholder="1,2,3" />

      <button @click="AttemptcreateConversation">Créer une Conversation</button>
    </div>

    <div class="form-group">
      <label>ID de la conversation</label>
      <input v-model="conversationId" placeholder="ID conversation" />
      <button @click="AttemptdeleteConversation">
        Supprimer une Conversation
      </button>
    </div>

    <div class="form-group">
      <label>ID de l'utilisateur</label>
      <input v-model="userId" placeholder="ID utilisateur" />
    </div>

    <div class="buttons">
      <button @click="AttemptaddUserToConversation">Ajouter utilisateur</button>
      <button @click="AttemptUsersFromConversation">
        Liste des utilisateurs
      </button>
      <button @click="checkUserInConversation">Vérifier présence</button>
      <button @click="removeUserFromConversation">Supprimer utilisateur</button>
    </div>

    <pre class="response">{{ responseMessage }}</pre>
  </div>
</template>

<style scoped>
label {
  font-family: "Mulish";
  font-weight: 400;
  letter-spacing: 1.3px;
}

.container {
  padding: 20px;
  max-width: 400px;
  margin: auto;
}
.form-group {
  margin-bottom: 15px;
}
input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
button {
  margin-top: 10px;
  padding: 8px;
  cursor: pointer;
}
pre {
  background: #f4f4f4;
  padding: 10px;
}

label {
  color: white;
}

h2 {
  color: white;
}
</style>
