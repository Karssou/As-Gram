<script lang="ts" setup>
const { removeNotification } = useNotificationStore();
const { notifications } = storeToRefs(useNotificationStore());

const IconNotifications = {
  error: "ri:error-warning-fill",
  success: "ri:checkbox-circle-fill",
};

const RemoveNotif = (notifid: number) => {
  removeNotification(notifid);
};
</script>

<template>
  <div id="notifications-container">
    <TransitionGroup name="notification-move" tag="div">
      <div v-for="notif in notifications" :key="notif.id" id="notification">
        <Icon
          :name="IconNotifications[notif.type]"
          :style="{
            '--notif-icon-color': notif.type === 'error' ? 'red' : 'green',
          }"
          id="notif-icon"
        />
        <h1 id="notif-title">{{ notif.message }}</h1>
        <button @click="RemoveNotif(notif.id)" id="notif-remove-btn">
          <Icon name="ri:close-line" id="notif-icon-btn" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
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
    min-width: 400px;
    max-width: 10vw;
    height: 60px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    padding: 0 5% 0 2%;
    justify-content: flex-start;
    margin-bottom: 7px;
    transition: all 0.2s ease;
    border: 1px solid rgba(255, 255, 255, 0.3); // Effet glossy
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

    #notif-title {
      margin: 0 auto 0 5px;
      width: 100%;
      max-height: 50px;
      color: white;
      overflow: hidden;
      font-size: 0.9rem;
      font-family: "Ubuntu";
    }

    #notif-icon {
      width: 25px;
      height: 25px;
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
      padding: 0;
      transition: all 0.125s ease;

      #notif-icon-btn {
        width: 20px;
        height: 20px;
        color: var(--notif-icon-color);
      }

      &:hover {
        cursor: pointer;
        background: rgb(212, 212, 212);
      }
    }
  }
}
</style>
