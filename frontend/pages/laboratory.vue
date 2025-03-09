<script lang="ts" setup>
const { salut } = HandleAuth();
const { addNotification } = useNotificationStore();
const { indexRequest } = HandleFriendRequest();

async function bonjour() {
  await ApiCall("GET", "/salut/salut");
  return addNotification("Actions parfaitement réussi", "success");
}

onMounted(async () => {
  await indexRequest();
});
</script>

<template>
  <main>
    <!-- <ButtonsBaseButton class="button" text="Salut" @click="salut" />
    <ButtonsBaseButton class="button" text="Bonjour" @click="bonjour" /> -->

    <FriendsRequestContainer />
  </main>
</template>

<style lang="scss" scoped>
@use "styles/laboratory.scss";
</style>
