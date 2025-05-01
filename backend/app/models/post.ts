import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare UserId: number

  @column()
  declare Content: string

  @column()
  declare MediaUrl: string

  @column()
  declare like: number

  @column()
  declare comments: number

  @column()
  declare love: number
  

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: false })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>
}
