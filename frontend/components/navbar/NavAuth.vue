<script lang="ts" setup>
import { icons } from "@/app/utils/icons";
</script>

<template>
  <div id="nav-auth-container">
    <div id="nav-auth-wrapper">
      <button class="nav-auth-btn" id="auth-login-btn">
        <div id="btn-content">
          <component
            class="nav-auth-icon"
            :is="icons['login']"
            v-if="icons['login']"
          />
          <span>Log-in</span>
        </div>
      </button>

      <div id="separator"></div>

      <button class="nav-auth-btn" id="auth-signup-btn">
        <div id="btn-content">
          <component
            class="nav-auth-icon"
            :is="icons['signin']"
            v-if="icons['signin']"
          />
          <span>Sign-up</span>
        </div>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#nav-auth-container {
  width: 250px;
  height: fit-content;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding-top: 0px;
  padding: 5px;

  #nav-auth-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    #separator {
      width: 60%;
      height: 2px;
      background: white;
      border-radius: 7px;
      border: none;
    }

    .nav-auth-btn {
      color: black;
      background-color: transparent;
      border: none;
      border-radius: 7px;
      width: 90%;
      height: 90%;
      min-height: 50px;
      transition: all 0.125s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: white;

        span {
          color: black;
        }

        .nav-auth-icon {
          color: black;
        }
      }

      #btn-content {
        width: fit-content;
        height: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
      }

      span {
        color: white;
        text-transform: uppercase;
        font-family: "Ubuntu";
      }

      .nav-auth-icon {
        color: white;
        margin-right: 10px;
        font-size: clamp(20px, 24px, 32px);
      }
    }
  }
}
</style>
