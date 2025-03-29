import Conversation from '#models/conversation'
import Message from '#models/message'
import { DateTime } from 'luxon'

export class MessageService {
  public static async sendMessage(conversationId: number, senderId: number, content: string) {
    const conversation = await Conversation.find(conversationId)
    if (!conversation) {
      throw new Error('Conversation non trouvée.')
    }

    if (!content.trim()) {
      throw new Error('Le message ne peut pas être vide.')
    }

    return await Message.create({
      conversationId,
      senderId,
      content,
      createdAt: DateTime.now(),
    })
  }

  public static async getMessages(conversationId: number, limit = 50, page = 1) {
    const conversation = await Conversation.find(conversationId)
    if (!conversation) {
      throw new Error('Conversation non trouvée.')
    }

    return await Message.query()
      .where('conversation_id', conversationId)
      .orderBy('created_at', 'desc')
      .paginate(page, limit)
  }

  public static async EditMessage(messageId: number, NewContent: string, userId: number) {
    const message = await Message.find(messageId)
    if (!message) {
      throw new Error("Le message n'existe pas")
    }

    if (message.senderId !== userId) {
      throw new Error('Vous ne pouvez modifier que vos propres messages.')
    }

    if (!NewContent || NewContent.trim() === '') {
      throw new Error('Le contenu du message ne peut pas être vide')
    }

    message.content = NewContent
    message.updatedAt = DateTime.now()
    await message.save()

    return message
  }
}
