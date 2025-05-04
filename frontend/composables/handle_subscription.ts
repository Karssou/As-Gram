export const useSubscription = () => {
  const subscribeToUser = async (userId: number) => {
    const request = await ApiCall("POST", `follow/subscribe/${userId}`);
  };

  const unsubscribeToUser = async (userId: number) => {
    const request = await ApiCall("POST", `/follow/unsubscribe/${userId}`);
  };

  return { subscribeToUser, unsubscribeToUser };
};
