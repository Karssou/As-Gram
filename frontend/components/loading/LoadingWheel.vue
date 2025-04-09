<script lang="ts" setup>
const props = defineProps({
  className: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div :class="['loader', className]"></div>
</template>

<style lang="scss" scoped>
.loader {
  width: 40px;
  height: 40px;
  border: 4px solid transparent;
  border-top-color: #bdbdbd;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
