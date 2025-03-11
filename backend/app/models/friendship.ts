import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  beforeSave,
  belongsTo,
  column,
} from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Friendship extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare senderId: number

  @column()
  declare receiverId: number

  @column()
  declare status: 'pending' | 'accepted' | 'declined'

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare createdAt: DateTime

  public serializeExtras() {
    return {
      created_at: this.createdAt?.toMillis(),
    }
  }

  @belongsTo(() => User, { foreignKey: 'senderId' })
  public sender!: relations.BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'receiverId' })
  public receiver!: relations.BelongsTo<typeof User>

  @beforeSave()
  public static convertDatesToMillis(friendship: Friendship) {
    friendship.createdAt = DateTime.fromMillis(friendship.createdAt?.toMillis() || Date.now())
  }

  @beforeFind()
  @beforeFetch()
  public static convertMillisToDateTime(friendship: Friendship) {
    if (friendship.createdAt) {
      friendship.createdAt = DateTime.fromMillis(friendship.createdAt.toMillis())
    }
  }
}
