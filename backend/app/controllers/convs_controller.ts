import { ConversationService } from '#services/conversation_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class ConvsController {
  async CreateConv({ request, auth, response }: HttpContext) {
    const userIds = request.input('userIds')
    const creatorId = auth.user!.id

    try {
      const conv = await ConversationService.createConversation(userIds, creatorId)
      return response.ok({
        status: 'success',
        message: 'Conversation créer avec succès',
        payload: conv,
      })
    } catch (error) {
      return response.badRequest({ status: 'error', message: error })
    }
  }

  async DeleteConv({ auth, response, params }: HttpContext) {
    const userId = auth.user!.id

    try {
      await ConversationService.deleteConversation(params.conversationId, userId)
      return response.ok({ status: 'success', message: 'Conversation deleted successfully' })
    } catch (error) {
      return response.badRequest({ status: 'error', message: error.message })
    }
  }
}
