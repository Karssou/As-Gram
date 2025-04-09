import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import Conversation from './conversation.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import MessageReaction from './message_reactions.js'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string

  @column()
  declare senderId: number

  @column()
  declare conversationId: number

  @hasMany(() => MessageReaction, { foreignKey: 'messageId' })
  public reactions: any

  @belongsTo(() => Conversation)
  public conversation!: BelongsTo<typeof Conversation>

  @belongsTo(() => User)
  public sender!: BelongsTo<typeof User>

  @belongsTo(() => Message, {
    foreignKey: 'quotedMessageId',
  })
  public quotedMessage!: BelongsTo<typeof Message>

  @hasMany(() => Message, {
    foreignKey: 'quotedMessageId',
  })
  public quotedBy!: HasMany<typeof Message>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  declare updatedAt: DateTime
}
