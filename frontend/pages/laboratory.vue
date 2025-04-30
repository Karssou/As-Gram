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
</script>

<template>
  <main>
    <input
      type="text"
      name=""
      id=""
      placeholder="ID DU POST"
      v-model="postid"
    />
    <button @click="attempt(postid)">Like Post</button>
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
