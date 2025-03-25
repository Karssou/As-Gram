<script lang="ts" setup>
const { fetchUserInformations } = HandleUser();

onMounted(async () => {
  await fetchUserInformations;
});

const search = ref("");
</script>

<template>
  <main>
    <MessageSidebarConversationContainer />
  </main>
</template>

<style lang="scss" scoped>
@use "styles/laboratory.scss";
</style>
