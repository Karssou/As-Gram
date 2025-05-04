import Conversation from '#models/conversation'
import Message from '#models/message'
import { DateTime } from 'luxon'
import { PusherService } from './pusher_service.js'

export class MessageService {
  public static async sendMessage(conversationId: number, senderId: number, content: string) {
    const conversation = await Conversation.find(conversationId)
    if (!conversation) {
      throw new Error('Conversation non trouvée.')
    }

    if (!content.trim()) {
      throw new Error('Le message ne peut pas être vide.')
    }

    const message = await Message.create({
      conversationId,
      senderId,
      content,
      createdAt: DateTime.now(),
    })

    await PusherService.sendMessage(conversationId, message)

    return message
  }

  public static async getMessages(conversationId: number) {
    const conversation = await Conversation.find(conversationId)
    if (!conversation) {
      throw new Error('Conversation non trouvée.')
    }

    const messages = await Message.query()
      .select('id', 'sender_id', 'content', 'created_at', 'updated_at')
      .where('conversation_id', conversationId)
      .orderBy('created_at', 'asc')
      .preload('reactions', (query) => {
        query.select('user_id', 'emoji')
      })

    return messages
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

  public static async DeleteMessage(messageId: number, userId: Number) {
    if (!messageId || '') {
      throw new Error('Rentrez un ID')
    }

    const message = await Message.find(messageId)

    if (!message) {
      throw new Error('Message non trouvé')
    }

    if (message.senderId !== userId) {
      throw new Error('Tu ne peux pas supprimer ce message !')
    }

    await message.delete()
  }
}
