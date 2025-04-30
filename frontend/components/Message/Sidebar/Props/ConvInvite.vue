<script lang="ts" setup>
import { icons } from "@/app/utils/icons";

const number = ref(22);
const showdropdown = ref(false);
const invitation = ref(3);
</script>

<template>
  <div id="invite-container">
    <button id="invite-btn" @click="showdropdown = !showdropdown">
      <div id="notification-pastille">
        <span>{{ number }}</span>
      </div>
      <component
        class="invite-icon"
        id="hover-icon"
        :is="icons['notificationhover']"
        v-if="icons['notificationhover']"
      />
      <component
        class="invite-icon"
        id="normal-icon"
        :is="icons['notification']"
        v-if="icons['notification']"
      />
    </button>
    <Transition name="dropdown">
      <div v-if="showdropdown" id="invite-dropdown">
        <ul v-if="invitation" id="dropdown-list">
          <li v-for="invit in invitation" class="dropdown-items">
            <div id="profile-pics"></div>
            <span id="user-info"> Pseudo </span>
          </li>
        </ul>

        <h1 class="error-text" v-else>Aucune invitation</h1>
      </div></Transition
    >
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.error-text {
  color: $color-text;
  font-size: 12px;
  text-transform: uppercase;
  font-family: "lato";
  text-align: center;
  line-height: 1.5;
  pointer-events: none;
  user-select: none;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: transform 0.175s ease-out;
  transform-origin: right top;
}

.dropdown-enter-from,
.dropdown-leave-to {
  transform: scale(0);
}

.dropdown-enter-to,
.dropdown-leave-from {
  transform: scale(1);
}

#invite-container {
  width: auto;
  height: auto;
  position: relative;
}

#invite-btn {
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  display: flex;
  padding: 5px;
  position: relative;

  #notification-pastille {
    position: absolute;
    right: 0;
    top: 0;
    width: 15px;
    height: 15px;
    background-color: $color-warning;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 10px;
      font-family: "Mulish";
      font-weight: 700;
      color: $color-text;
    }
  }

  .invite-icon {
    color: $color-text;
    font-size: 24px;
  }

  #hover-icon {
    display: none;
  }

  #normal-icon {
    display: block;
  }

  &:hover {
    cursor: pointer;
    #hover-icon {
      display: block;
    }

    #normal-icon {
      display: none;
    }
  }
}
#invite-dropdown {
  position: absolute;
  right: 80%;
  top: 78%;
  width: 150px;
  min-height: 50px;
  height: fit-content;
  max-height: 150px;
  background-color: $color-panel;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $color-border;

  #dropdown-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    .dropdown-items {
      flex-wrap: nowrap;
      width: 100%;
      min-height: 50px;
      height: 48px;
      padding: 0 5px;
      display: flex;
      flex-direction: row;
      border-radius: 7px;
      align-items: center;
      justify-content: flex-start;
      position: relative;

      &:hover {
        background-color: $color-panel-secondary;
      }

      &::before {
        content: "";
        position: absolute;
        top: 100%;
        left: 10%;
        width: 80%;
        height: 1px;
        background-color: $color-border-discret;
      }

      #profile-pics {
        margin-right: 10px;
        background-color: red;
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }

      #user-info {
        color: $color-text;
        font-family: "Inter";
        font-size: 14px;
        line-height: 0;
      }
    }
  }
}
</style>
