<script lang="ts" setup>
const { removeNotification } = useNotificationStore();
const { notifications } = storeToRefs(useNotificationStore());
import { icons } from "@/app/utils/icons";

const IconNotifications: any = {
  error: "error",
  success: "",
};

const RemoveNotif = (notifid: number) => {
  removeNotification(notifid);
};
</script>

<template>
  <div id="notifications-container">
    <TransitionGroup name="notification-move" tag="div">
      <div v-for="notif in notifications" :key="notif.id" id="notification">
        <component :is="icons[IconNotifications[notif.type]]" id="notif-icon" />
        <h1 id="notif-title">{{ notif.message }}</h1>
        <button @click="RemoveNotif(notif.id)" id="notif-remove-btn">
          <component :is="icons['close']" id="notif-icon-btn" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#notifications-container {
  position: fixed;
  bottom: 0.5%;
  right: 0.5%;
  padding: 10px;
  width: auto;
  max-width: 700px;
  min-width: 300px;
  min-height: calc(50px + 2%);
  display: flex;
  flex-direction: column;

  .notification-move-enter-active,
  .notification-move-leave-active {
    transition: all 0.5s;
  }

  .notification-move-enter-from,
  .notification-move-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }

  .notification-move-enter-to,
  .notification-move-leave-from {
    opacity: 1;
    transform: translateX(0);
  }

  #notification {
    min-width: 350px;
    max-width: 10vw;
    height: 55px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    padding: 0 5% 0 2%;
    justify-content: flex-start;
    margin-bottom: 7px;
    transition: all 0.2s ease;
    background: $color-black;
    backdrop-filter: blur(10px);
    padding: 0 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

    #notif-title {
      margin: 0 auto 0 10px;
      width: 100%;

      color: $color-text;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 0.9rem;
      font-family: "Ubuntu";
      word-wrap: break-word;
      white-space: nowrap;
    }

    #notif-icon {
      width: 32px;
      height: 32px;
      color: $color-text;
    }

    #notif-remove-btn {
      border-radius: 5px;
      border: none;
      display: flex;
      background: transparent;
      align-items: center;
      justify-content: center;
      width: 25px;
      height: 25px;
      flex-shrink: 0;
      padding: 0;
      transition: all 0.125s ease;

      #notif-icon-btn {
        width: 20px;
        height: 20px;
        color: $color-text;
      }

      &:hover {
        cursor: pointer;
        background: rgb(212, 212, 212);
        #notif-icon-btn {
          color: black;
        }
      }
    }
  }
}
</style>
