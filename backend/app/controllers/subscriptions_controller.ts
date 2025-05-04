import { SubscriptionService } from '#services/subscription_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class SubscriptionsController {
  public async FollowUser({ params, auth, response }: HttpContext) {
    try {
      const { followId } = params
      const userId = auth.user!.id

      await SubscriptionService.subscribeToUser(userId, Number(followId))

      return response.ok({
        status: 'success',
        message: 'Vous suivez cet utilisateur',
      })
    } catch (error) {
      console.warn(error)
      return response.badRequest({
        status: 'error',
        message: error.message ?? 'Une erreur est survenue',
      })
    }
  }

  public async UnfollowUser({ params, auth, response }: HttpContext) {
    const { followId } = params
    const userId = auth.user!.id

    try {
      await SubscriptionService.unsubscribeFromUser(userId, followId)
      return response.ok({
        status: 'success',
        message: 'Vous ne suivez plus cet utilisateur',
      })
    } catch (error) {
      console.warn(error)
      return response.badRequest({
        status: 'error',
        message: 'Une erreur est survenue',
      })
    }
  }
}
