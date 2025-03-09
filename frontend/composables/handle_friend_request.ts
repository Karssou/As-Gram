import Index from "~/pages/index.vue";

export function HandleFriendRequest() {
  const { friends, PendingRequest } = storeToRefs(useFriendStore());
  const { addNotification } = useNotificationStore();

  async function fetchFriends() {
    try {
      const result: any = ApiCall("GET", "/friends/index/friends");
      friends.value = result.friends;
    } catch (error) {
      return console.log("Ca a pas marché [DEMANDE d'AMI]");
    }
  }

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
    const request: any = await ApiCall("GET", "/friends/index/request");
    PendingRequest.value = request;
  }

  async function declineRequest(pseudo: any, panelId: number) {
    const request = await ApiCall("POST", "/friends/declined", {
      sender_pseudo: pseudo,
    });

    if (!request) {
      addNotification("La demande n'a pas été décliné", "error");
      return;
    }

    const index = PendingRequest.value.findIndex((item) => item.id === panelId);
    if (index !== -1) {
      PendingRequest.value.splice(index, 1);
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
    fetchFriends,
    sendRequest,
    indexRequest,
    declineRequest,
    acceptRequest,
  };
}
