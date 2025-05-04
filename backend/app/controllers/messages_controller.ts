import { MessageService } from '#services/message_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class MessagesController {
  public async SendMessage({ auth, request, params, response }: HttpContext) {
    try {
      const { conversationId } = params
      const { content } = request.only(['content'])
      const senderId = auth.user!.id

      await MessageService.sendMessage(Number(conversationId), senderId, content)
      return response.ok({ status: 'success', message: 'Message envoyé' })
    } catch (error) {
      return response.badRequest({ status: 'error', message: error })
    }
  }

  public async GetMessages({ response, params }: HttpContext) {
    try {
      const { conversationId } = params
      const message: Object = await MessageService.getMessages(Number(conversationId))
      return response.ok(message)
    } catch (error) {
      return response.badRequest({ status: 'error', message: error })
    }
  }

  public async DeleteMessage({ response, params, auth }: HttpContext) {
    try {
      const userid = auth.user!.id
      const { messageId } = params

      await MessageService.DeleteMessage(messageId, userid)

      return response.ok({ status: 'success', message: 'Message supprimé' })
    } catch (error) {
      return response.badRequest({ status: 'error', message: error })
    }
  }

  public async EditMessage({ response, params, request, auth }: HttpContext) {
    try {
      const { messageId } = params
      const UserId = auth.user!.id
      const { content } = request.only(['content'])

      const edit = await MessageService.EditMessage(Number(messageId), content, UserId)
      return response.ok({ status: 'success', message: edit })
    } catch (error) {
      return response.badRequest({ status: 'error', message: error })
    }
  }
}
