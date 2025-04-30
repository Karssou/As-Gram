import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ConversationUser extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare conversation_id: number

  @column()
  declare user_id: number

  @column()
  declare role: 'member' | 'admin'

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
