export function HandleFriendRequest() {
  const { Friends, Pending, Received } = storeToRefs(useFriendStore());
  const { addNotification } = useNotificationStore();

  async function sendRequest(id: number) {
    console.log(id);
    const request: any = await ApiCall("POST", "/friends/request", {
      receiver_id: id,
    });

    if (request.status === "success") {
    }

    addNotification(request.message, request.status);
  }

  async function indexRequest() {
    const request: any = await ApiCall("GET", "/friends/index/friends");

    Pending.value = request.pending.map((req: any) => ({
      id: req.id,
      createdAt: req.created_at,
      username: req.receiver.username,
      userId: req.receiver.id,
    }));

    Received.value = request.received.map((req: any) => ({
      id: req.id,
      createdAt: req.created_at,
      username: req.sender.username,
      userId: req.sender.id,
    }));

    Friends.value = request.friends.map((req: any) => ({
      id: req.id,
      createdAt: req.created_at,
      username: req.friend.username,
      userId: req.friend.id,
    }));
  }

  async function declineRequest(id: number, panelId: number) {
    const request: any = await ApiCall("POST", "/friends/declined", {
      sender_id: id,
    });

    addNotification(request.message, request.status);

    if (request.response.status === "success") {
      const index = Received.value.findIndex((item) => item.id === panelId);
      if (index !== -1) {
        Received.value.splice(index, 1);
      }
    }
  }

  async function acceptRequest(id: number, panelId: number) {
    const request: any = await ApiCall("POST", "friends/accept", {
      sender_id: id,
    });

    console.log("Réponse de l'API :", request); // Vérifie ce que tu reçois

    if (request?.status === "success") {
      const moveToFriends = (panelId: number) => {
        const index = Received.value.findIndex((item) => item.id === panelId);
        if (index !== -1) {
          const [movedItem] = Received.value.splice(index, 1); // Corrigé ici
          Friends.value.push(movedItem);
        }
      };

      moveToFriends(panelId);
      addNotification(request.message, request.status);
    } else {
      addNotification("Une erreur s'est produite", "error");
    }
  }

  async function searchFriends(query: string) {
    if (!query) return [];

    try {
      return await ApiCall(
        "GET",
        `/friends/search?q=${encodeURIComponent(query)}`
      );
    } catch (error) {
      console.error("Erreur lors de la recherche d'amis :", error);
      return [];
    }
  }

  async function deleteFriend(id: number, panelId: number) {
    const request: any = await ApiCall("POST", "/friends/remove", {
      friend_id: id,
    });

    const index = Friends.value.findIndex((item) => item.id === panelId);
    if (index !== -1) {
      Friends.value.splice(index, 1);
    }

    addNotification(request.message, request.status);
  }

  return {
    sendRequest,
    indexRequest,
    declineRequest,
    acceptRequest,
    searchFriends,
    deleteFriend,
  };
}
