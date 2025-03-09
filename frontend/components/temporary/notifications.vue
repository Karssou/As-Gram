<script lang="ts" setup>
const { removeNotification } = useNotificationStore();
const { notifications } = storeToRefs(useNotificationStore());

const IconNotifications = {
  error: "ri:error-warning-fill",
  success: "ri:check-fill",
};

const RemoveNotif = (notifid: number) => {
  removeNotification(notifid);
};
</script>

<template>
  <div id="notifications-container">
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
  </div>
</template>

<style lang="scss" scoped>
@use "styles/notifications.scss";
</style>
