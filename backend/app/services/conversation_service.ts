import Conversation from '#models/conversation'
import ConversationUser from '#models/conversation_user'
import { DateTime } from 'luxon'

export class ConversationService {
  public static async createConversation(
    userIds: number[],
    creatorId: number,
    type: 'private' | 'group'
  ) {
    if (!Array.isArray(userIds) || userIds.length === 0) {
      throw new Error('La liste des utilisateurs ne peut pas être vide.')
    }

    const timestamp = DateTime.now().toISO()

    const conversation = await Conversation.create({
      type,
      creator_id: creatorId,
      created_at: timestamp,
    })

    if (!userIds.includes(creatorId)) {
      userIds.push(creatorId)
    }

    const userRoles = userIds.reduce(
      (acc, userId) => {
        acc[userId] = { role: userId === creatorId && type === 'group' ? 'admin' : 'member' }
        return acc
      },
      {} as Record<number, { role: 'admin' | 'member' }>
    )

    await conversation.related('users').attach(userRoles)

    return conversation
  }

  public static async addUserToConversation(
    conversationId: number,
    userId: number,
    role: 'admin' | 'member' = 'member'
  ) {
    const conversation = await Conversation.find(conversationId)
    if (!conversation) {
      throw new Error('Conversation non trouvée.')
    }

    const alreadyInConversation = await ConversationUser.query()
      .where('conversation_id', conversationId)
      .where('user_id', userId)
      .first()

    if (alreadyInConversation) {
      throw new Error("L'utilisateur est déjà dans la conversation.")
    }

    await conversation.related('users').attach({ [userId]: { role } })
    return { message: 'Utilisateur ajouté avec succès', conversation }
  }

  public static async getUsersFromConversation(conversationId: number) {
    const conversation = await Conversation.query()
      .where('id', conversationId)
      .preload('users', (query) => query.select('id', 'username'))
      .first()

    if (!conversation) {
      throw new Error('Conversation non trouvée.')
    }

    return conversation.users
  }

  public static async isUserInConversation(conversationId: number, userId: number) {
    const exists = await ConversationUser.query()
      .where('conversation_id', conversationId)
      .where('user_id', userId)
      .first()

    return exists
      ? { message: 'Utilisateur dans la conversation', status: true }
      : { message: 'Utilisateur pas dans la conversation', status: false }
  }

  public static async removeUserFromConversation(
    conversationId: number,
    requesterId: number,
    userId: number
  ) {
    if (userId === requesterId) {
      throw new Error("Tu ne peux pas t'enlever toi même")
    }

    const conversation = await Conversation.find(conversationId)

    if (!conversation) {
      throw new Error('Conversation non trouvée.')
    }
    const IsAdmin = await ConversationUser.query()
      .where('conversation_id', conversationId)
      .where('user_id', requesterId)
      .where('role', 'admin')
      .first()

    if (conversation.type === 'group' && !IsAdmin) {
      throw new Error(
        'Seuls les administrateurs peuvent modifier les membres de cette conversation.'
      )
    }

    const userInConversation = await ConversationUser.query()
      .where('conversation_id', conversationId)
      .where('user_id', userId)
      .first()

    if (!userInConversation) {
      throw new Error("L'utilisateur ne fait pas partie de la conversation.")
    }

    await conversation.related('users').detach([userId])
    return 'Utilisateur supprimé de la conversation.'
  }

  public static async deleteConversation(conversationId: number, userId: number) {
    const conversation = await Conversation.find(conversationId)
    if (!conversation) {
      throw new Error('Conversation non trouvée.')
    }

    const userInConversation = await ConversationUser.query()
      .where('conversation_id', conversationId)
      .where('user_id', userId)
      .first()

    if (!userInConversation) {
      throw new Error('Tu ne fais pas partie de la conversation.')
    }

    if (userInConversation.role !== 'admin' && conversation.creator_id !== userId) {
      throw new Error("Vous n'avez pas la permission de supprimer cette conversation.")
    }

    await conversation.delete()
    return 'Conversation supprimée avec succès.'
  }

  public static async GetUserConv(userId: number) {
    const query = await Conversation.query()
      .whereHas('users', (queryTable) => {
        queryTable.where('users.id', userId)
      })
      .preload('users')

    return query
  }
}
