<script lang="ts" setup></script>

<template>
  <div id="main-navbar">
    <NavbarNavHead />
    <div class="separator"></div>
    <NavbarNavElement />
    <div class="separator"></div>
    <NavbarNavProps />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#main-navbar {
  background-color: $color-panel;
  border-radius: 12px;
  padding: 15px 0px;
  width: 250px;
  height: 60vh;
  min-height: 50%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.separator {
  width: 60%;
  height: 2px;
  background-color: white;
  border-radius: 12px;
  align-self: center;
}
</style>
