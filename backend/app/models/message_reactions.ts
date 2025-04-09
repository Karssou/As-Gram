import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import Message from './message.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class MessageReaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  public messageId!: number

  @column()
  declare emoji: 'like' | 'heart' | 'smile' | 'laugh'

  @belongsTo(() => Message)
  public message!: BelongsTo<typeof Message>

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>
}
