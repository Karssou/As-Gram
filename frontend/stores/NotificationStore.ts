export const useNotificationStore = defineStore("notfications", () => {
  interface Notification {
    id: number;
    message: string;
    type: "success" | "error";
  }

  const notifications = ref<Notification[]>([]);
  let idCounter = 0;

  function addNotification(msg: string, type: "success" | "error") {
    const id = idCounter++;

    if (notifications.value.length > 5) {
      notifications.value.shift();
    }
    notifications.value.push({ id, message: msg, type });
    setTimeout(() => removeNotification(id), 15000);
  }

  function removeNotification(id: number) {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  }

  return { notifications, addNotification, removeNotification };
});
