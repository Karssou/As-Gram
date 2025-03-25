import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare type: 'private' | 'group'

  @column()
  declare avatar: String

  @column()
  declare name: String

  @column()
  declare last_message_id: number

  @column()
  declare last_message_user_id: number

  @column()
  declare last_message: String

  @column()
  declare creator_id: number

  @column()
  declare last_message_at: number

  @column()
  declare created_at: string

  @column()
  declare updated_at: string

  @manyToMany(() => User, {
    pivotTable: 'conversation_users',
    pivotTimestamps: true,
    pivotColumns: ['role'],
  })
  public users!: ManyToMany<typeof User>
}
