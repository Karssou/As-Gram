import Subscription from '#models/subscription'

export class SubscriptionService {
  public static async subscribeToUser(userId: number, subscribeToId: number) {
    if (userId === subscribeToId) {
      console.log('non arrête')
      throw new Error('Vous ne pouvez pas vous abonner à vous-même')
    }
    const existingSubscription = await Subscription.query()
      .where('user_id', userId)
      .where('subscribed_to', subscribeToId)
      .first()

    if (existingSubscription) {
      throw new Error('Vous êtes déjà abonné à cet utilisateur.')
    }

    const subscription = await Subscription.create({
      user_id: userId,
      subscribed_to: subscribeToId,
    })

    return subscription
  }

  public static async isSubscribed(userId: number, subscribedToId: number) {
    const subscription = await Subscription.query()
      .where('user_id', userId)
      .where('subscribed_to', subscribedToId)
      .first()

    if (subscription) {
      return true
    }

    return false
  }

  public static async unsubscribeFromUser(userId: number, subscribeToId: number) {
    const subscription = await Subscription.query()
      .where('user_id', userId)
      .where('subscribed_to', subscribeToId)
      .first()

    if (!subscription) {
      throw new Error("Vous n'êtes pas abonné à cet utilisateur.")
    }

    await subscription.delete()

    return "c'est bon t'es désabonné frérot"
  }
}
