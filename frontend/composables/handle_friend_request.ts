import Index from "~/pages/index.vue";

export function HandleFriendRequest() {
  const { Friends, Pending, Received } = storeToRefs(useFriendStore());
  const { addNotification } = useNotificationStore();

  async function sendRequest(receiver_pseudo: string) {
    const request = await ApiCall("POST", "/friends/request", {
      receiver_pseudo: receiver_pseudo,
    });
    if (!request) {
      addNotification(
        "[FRIEND REQUEST] La requête n'a pas été envoyée",
        "error"
      );
    }
  }

  async function indexRequest() {
    const request: any = await ApiCall("GET", "/friends/index/friends");

    Pending.value = request.pending.map((req: any) => ({
      id: req.id,
      createdAt: new Date(req.created_at),
      username: req.receiver.username,
      userId: req.receiver.id,
    }));

    Received.value = request.received.map((req: any) => ({
      id: req.id,
      createdAt: new Date(req.created_at),
      username: req.sender.username,
      userId: req.sender.id,
    }));

    Friends.value = request.friends.map((req: any) => ({
      id: req.id,
      createdAt: new Date(req.created_at),
      username: req.friend.username,
      userId: req.friend.id,
    }));
  }

  async function declineRequest(pseudo: any, panelId: number) {
    const request = await ApiCall("POST", "/friends/declined", {
      sender_pseudo: pseudo,
    });

    if (!request) {
      addNotification("La demande n'a pas été décliné", "error");
      return;
    }

    const index = Pending.value.findIndex((item) => item.id === panelId);
    if (index !== -1) {
      Pending.value.splice(index, 1);
    }
  }

  async function acceptRequest(pseudo: string) {
    try {
      const request: any = await ApiCall("POST", "friends/accept", {
        sender_pseudo: pseudo,
      });

      if (!request) {
        return addNotification("La requête n'a pas marché", "error");
      }
      return addNotification(request, "success");
    } catch (error: any) {
      return addNotification(error, "error");
    }
  }

  return {
    sendRequest,
    indexRequest,
    declineRequest,
    acceptRequest,
  };
}
