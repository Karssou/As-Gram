import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Conversation from './conversation.js'
import MessageReaction from './message_reactions.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare biography: string | null

  @column()
  declare avatar: string | null

  @column()
  declare birthdate: string | Date | null

  @column()
  declare lastLogin: string

  @column()
  declare gender: 'female' | 'male'

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Conversation, {
    pivotTable: 'conversation_users',
    pivotTimestamps: true,
    pivotColumns: ['role'],
  })
  public conversations!: ManyToMany<typeof Conversation>

  @hasMany(() => MessageReaction, { foreignKey: 'userId' })
  public messageReactions!: HasMany<typeof MessageReaction>

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '1min',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}
