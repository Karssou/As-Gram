import Message from '#models/message'
import MessageReaction from '#models/message_reactions'

export class MessageReactionService {
  public static async addOrUpdateReaction(
    messageId: number,
    userId: number,
    reaction: 'like' | 'smile' | 'heart' | 'laugh'
  ) {
    const message = await Message.find(messageId)
    if (!message) {
      throw new Error('Message non trouvé.')
    }

    console.warn('[ AJOUT ] VERIFICATION DU MESSAGE')

    const existingReaction = await MessageReaction.query()
      .where('message_id', messageId)
      .andWhere('user_id', userId)
      .first()

    console.warn(' [AJOUT] Cherchage OK')

    if (existingReaction) {
      existingReaction.emoji = reaction

      await existingReaction.save()
      return existingReaction
    } else {
      const CreateReaction = await MessageReaction.create({
        messageId,
        userId,
        emoji: reaction,
      })
      return CreateReaction
    }
  }

  public static async removeReaction(messageId: number, userId: number) {
    const reaction = await MessageReaction.query()
      .where('message_id', messageId)
      .andWhere('user_id', userId)
      .first()

    if (!reaction) {
      throw new Error('Réaction non trouvée.')
    }
    console.warn('[ SUPPRESSION ] REACTION TROUVEE')

    await reaction.delete()
    return { message: 'Réaction supprimée avec succès.' }
  }
}
