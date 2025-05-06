<script lang="ts" setup>
const route = useRoute();
const CurrentuserID = route.params.id;
</script>

<template>
  <h1>salut USer {{ CurrentuserID }}</h1>
</template>

<style lang="scss" scoped></style>
