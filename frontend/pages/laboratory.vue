<script lang="ts" setup>
const { fetchUserInformations } = HandleUser();

onMounted(async () => {
  await fetchUserInformations;
});
</script>

<template>
  <main>
    <Navbar />
  </main>
</template>

<style lang="scss" scoped>
@use "styles/laboratory.scss";
</style>
