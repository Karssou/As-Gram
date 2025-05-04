<script lang="ts" setup>
const bonjour = () => console.log("Bonjour");

const postid = ref();

const attempt = async (postId: number) => {
  const req = ApiCall("POST", `/posts/${postId}/like`);
};

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

const selectedFile = ref<File | null>(null);

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    selectedFile.value = input.files[0];
  }
}

async function submit() {
  const formData = new FormData();
  if (selectedFile.value) {
    formData.append("avatar", selectedFile.value);
  }
  const req = await ApiCall(
    "POST",
    `${useRuntimeConfig().public.apiBase}/user/avatar`,
    formData,
    false
  );
  console.log(req);
  return req;
}

const followId = ref();

const Isfollow = async () => {
  return await ApiCall(
    "GET",
    `${useRuntimeConfig().public.apiBase}/follow/isfollowTo/${followId.value}`
  );
};

const Subscribe = async () => {
  return await ApiCall(
    "POST",
    `${useRuntimeConfig().public.apiBase}/follow/subscribe/${followId.value}`
  );
};

const unsubscribe = async () => {
  return await ApiCall(
    "POST",
    `${useRuntimeConfig().public.apiBase}/follow/unsubscribe/${followId.value}`
  );
};
</script>

<template>
  <main>
    <form @submit.prevent="submit">
      <input type="file" name="file" id="pp" @change="onFileChange" />
      <button type="submit">Mettre à jour l'avatar</button>
    </form>

    <InputsTextInput placeholder="ID du mec" v-model="followId" />

    <button @click="Subscribe">S'abonner</button>
    <button @click="Isfollow">Je suis abonné ?</button>
    <button @click="unsubscribe">Se désabonner</button>
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
