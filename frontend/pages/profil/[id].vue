<script lang="ts" setup>
const { fetchUserInformations } = HandleUser();
import { UserProfileUserInformation } from "#components";
import { onMounted } from "vue";

const userstore = useUserStore();

onMounted(async () => {
  const response: any = await fetchUserInformations();
  const userdata = response?.user;
  if (userdata) {
    userstore.user = userdata;
  }
});
</script>

<template>
  <div id="page-content">
    <UserProfileUserInformation />
  </div>
</template>

<style lang="scss" scoped>
@use "styles/profil.scss";
</style>
