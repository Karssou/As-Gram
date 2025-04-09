<script lang="ts" setup>
import type { UserHeader } from "~/types/UserHeader";

const props = defineProps<{
  user: UserHeader;
}>();
</script>

<template>
  <div id="conversation-header">
    <section id="user-informations"></section>
  </div>
</template>

<style lang="scss" scoped></style>
