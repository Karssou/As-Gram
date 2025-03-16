<script lang="ts" setup>
import { icons } from "@/app/utils/icons";
import ArrowBottomIcon from "~/components/Icons/ArrowBottomIcon.vue";

const { salut } = HandleAuth();
const { addNotification } = useNotificationStore();
const { indexRequest } = HandleFriendRequest();

onMounted(async () => {
  await indexRequest();
});

const test = [
  { value: "Salut", label: "Bonjour" },
  { value: "Caca", label: "Salut" },
];
const selectedRole = ref("");
</script>

<template>
  <main>
    <p>Rôle sélectionné : {{ selectedRole }}</p>
    <InputsSelectBox
      :options="test"
      className="custom"
      v-model="selectedRole"
    />
    
  </main>
</template>

<style lang="scss" scoped>
@use "styles/laboratory.scss";
</style>
