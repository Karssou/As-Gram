<script lang="ts" setup>
import Notifications from "~/components/Shared/notifications.vue";

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

const { fetchUserInformations } = HandleUser();

const followId = ref();
</script>

<template>
  <main>
    <!-- <form @submit.prevent="submit">
      <input type="file" name="file" id="pp" @change="onFileChange" />
      <button type="submit">Mettre à jour l'avatar</button>
    </form> -->

    <AuthScreenLogin />
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
