<script lang="ts" setup>
const authstore = useAuthStore();
const test = () => {
  console.log(authstore.salut());
};

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button @click="test" id="button">
    <span class="span-btn">{{ text }}</span>
  </button>
</template>

<style lang="scss" scoped>
@use "button.scss";
</style>
