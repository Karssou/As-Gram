import Conversation from '#models/conversation'
import ConversationUser from '#models/conversation_user'
import { DateTime } from 'luxon'

export class ConversationService {
  // Crée une conversation et ajoute des utilisateurs

  public static async createConversation(userIds: number[], creatorId: number) {
    const timestamp = DateTime.now().toISO()

    const conversation = await Conversation.create({
      type: 'private',
      creator_id: creatorId,
      created_at: timestamp,
    })
    await conversation.related('users').attach(userIds)
    return conversation
  }

  public static async addUserToConversation(
    conversationId: number,
    userId: number,
    role: 'admin' | 'member' = 'member'
  ) {
    const conversation = await Conversation.findOrFail(conversationId)
    await conversation.related('users').attach({ [userId]: { role } })
    return conversation
  }

  // Récupère tous les utilisateurs d'une conversation

  public static async getUsersFromConversation(conversationId: number) {
    const conversation = await Conversation.query()
      .where('id', conversationId)
      .preload('users', (query) => query.select('id', 'username'))
      .firstOrFail()
    return conversation.users
  }

  public static async isUserInConversation(conversationId: number, userId: number) {
    const conversation = await Conversation.query()
      .where('id', conversationId)
      .whereHas('users', (query) => {
        query.where('user_id', userId)
      })
      .first()

    return !!conversation
  }

  public static async removeUserFromConversation(conversationId: number, userId: number) {
    const conversation = await Conversation.findOrFail(conversationId)
    await conversation.related('users').detach([userId])
    return conversation
  }

  public static async deleteConversation(conversationId: number, userId: number) {
    const conversation = await Conversation.find(conversationId)
    if (!conversation) {
      throw new Error('Conversation non trouvée')
    }

    const userInConversation = await ConversationUser.query()
      .where('conversation_id', conversationId)
      .where('user_id', userId)
      .first()

    if (!userInConversation) {
      throw new Error('Tu ne fais pas partie de la conversation')
    }

    if (userInConversation.role !== 'admin' && conversation.creator_id !== userId) {
      throw new Error("Vous n'avez pas la permission")
    }

    await conversation.delete()
  }
}
