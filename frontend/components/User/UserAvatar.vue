<script lang="ts" setup>
const props = defineProps<{
  userId: number;
}>();

const path = `/profil/${props.userId}`;
</script>

<template>
  <NuxtLink :to="path" id="link">
    <div id="pp"></div>
    <span id="name">Karssou</span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#link {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 7px;

  padding-right: 10px;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
}
#pp {
  width: 35px;
  height: 35px;
  background-color: grey;
  border-radius: 50%;
}

#name {
  color: $color-text;
  font-family: "Lato";
  font-size: 1rem;
  font-weight: 600;
}
</style>
