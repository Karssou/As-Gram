import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare user_id: number

  @column()
  declare subscribed_to: number

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user!: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'subscribed_to',
  })
  public subscribedTo!: BelongsTo<typeof User>
}
