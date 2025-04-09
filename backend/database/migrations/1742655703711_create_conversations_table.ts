import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'conversations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at')
      table.enum('type', ['private', 'group']).notNullable()
      table.integer('creator_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('name').nullable()
      table.string('avatar').nullable()
      table.timestamp('last_message_at').nullable()
      table.string('last_message').nullable()
      table.integer('last_message_id').unsigned().nullable()
      table.integer('last_message_user_id').unsigned().nullable()

      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
