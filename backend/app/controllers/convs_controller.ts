import { ConversationService } from '#services/conversation_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class ConvsController {
  async CreateConv({ request, auth, response }: HttpContext) {
    const userIds = request.input('userIds')
    const type = request.input('type')
    const creatorId = auth.user!.id

    try {
      const conv = await ConversationService.createConversation(userIds, creatorId, type)
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

  async AddUserToConv({ request, response, params }: HttpContext) {
    const UserId = request.input('userId')
    const conversationId = params.conversationId

    try {
      const conversation = ConversationService.addUserToConversation(
        conversationId,
        UserId,
        'member'
      )
      return response.ok({
        status: 'success',
        message: 'Utilisateur ajouté !',
        payload: conversation,
      })
    } catch (error) {
      return response.badRequest({ status: 'error', message: error })
    }
  }

  async DeleteUser({ params, response, auth }: HttpContext) {
    const userId = params.userId
    const conversationId = params.conversationId
    const requester = auth.user!.id

    try {
      const conv = await ConversationService.removeUserFromConversation(
        conversationId,
        requester,
        userId
      )
      return response.ok({ status: 'sucess', message: 'Utilisateur supprimé', payload: conv })
    } catch (error) {
      return response.badRequest({ status: 'error', message: error })
    }
  }

  async GetUserFromConv({ params, response }: HttpContext) {
    const conversationId = params.conversationId

    try {
      const conv = await ConversationService.getUsersFromConversation(conversationId)
      return response.ok({ status: 'success', payload: conv })
    } catch (error) {
      return response.badRequest({ status: 'error', message: error })
    }
  }

  async IsUserInConv({ params, response }: HttpContext) {
    const conversationId = params.conversationId
    const userId = params.userId

    try {
      const conv = await ConversationService.isUserInConversation(conversationId, userId)
      response.ok({ status: 'success', message: conv })
    } catch (error) {
      response.badRequest({ status: 'error', message: error })
    }
  }
}
