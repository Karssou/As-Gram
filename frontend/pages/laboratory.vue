<script lang="ts" setup>
const { fetchUserInformations } = HandleUser();

onMounted(async () => {
  await fetchUserInformations;
});
</script>

<template>
  <main>
    <MessagePropsMessageBox
      message="sqdkfjsdqm,dsdvmdfcnsdvjfsdnjmfdslfjdsnfmkldsjvfndsjflsdnvfjdslfvndsjvflkdsfvndsjlfvk"
      timestamp="A l'instant"
      sender="Michel"
    />
    <MessageInputBar />
  </main>
</template>

<style lang="scss" scoped>
@use "styles/laboratory.scss";
</style>
