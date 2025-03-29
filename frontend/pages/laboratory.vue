<script lang="ts" setup>
import InputBar from "~/components/Message/InputBar.vue";
import Bubble from "~/components/Message/props/Bubble.vue";
import TypingIndicator from "~/components/Message/props/TypingIndicator.vue";

const { fetchUserInformations } = HandleUser();

onMounted(async () => {
  await fetchUserInformations;
});

const search = ref("");
</script>

<template>
  <main>
    <MessageChat />
  </main>
</template>

<style lang="scss" scoped>
@use "styles/laboratory.scss";
</style>
