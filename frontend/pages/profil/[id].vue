<script lang="ts" setup>
const { fetchUserInformations } = HandleUser();
import { onMounted } from "vue";

const userstore = useUserStore();

onMounted(async () => {
  if (!userstore.user) {
    const response: any = await fetchUserInformations();
    const userdata = response?.user;
    if (userdata) {
      userstore.user = userdata;
    }
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
