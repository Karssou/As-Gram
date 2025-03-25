<script lang="ts" setup>
import { icons } from "@/app/utils/icons";
</script>

<template>
  <div id="conversation-container">
    <div id="conversation-header">
      <h1>CONVERSATION HEADER</h1>
    </div>
    <div id="searchbar">
      <InputsSearchBar placeholder="Rechercher" style="width: 80%" />
    </div>
    <div id="content">
      <div id="content-header">
        <span>Conversations</span>
        <MessageSidebarPropsConvInvite />
      </div>
      <div id="content-panel">
        <h1>PANEL</h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#conversation-container {
  width: 250px;
  max-height: 100vh;
  height: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;

  #conversation-header {
    width: 100%;
    height: 100%;
    background-color: grey;
    flex: 1 1 3%;
  }

  #searchbar {
    width: 100%;
    height: 100%;
    flex: 1 1 3%;
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex: 1 0 80%;

    #content-header {
      width: 100%;
      height: 100%;
      flex: 1 1 10%;
      display: flex;
      align-items: flex-end;
      padding: 1% 3%;
      justify-content: space-between;
      background-color: $color-panel;
      border-bottom: 1px solid $color-text;

      span {
        color: $color-text;
        font-family: "Lato";
        font-weight: 300;
        margin-bottom: 3%;
        font-size: 16px;
      }
    }

    #content-panel {
      width: 100%;
      height: 100%;
      flex: 1 1 90%;
      background-color: red;
    }
  }
}
</style>
