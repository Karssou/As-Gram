<script lang="ts" setup>
import type { User } from "~/types/User";

const { user } = useUserStore();
const form = ref<User>({ ...user! });
</script>

<template>
  <h1>salut</h1>
</template>

<style lang="scss" scoped></style>
