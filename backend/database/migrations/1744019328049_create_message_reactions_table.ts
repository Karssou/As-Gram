import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'message_reactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('emoji', ['like', 'heart', 'smile', 'laugh'])
      table
        .integer('message_id')
        .unsigned()
        .references('id')
        .inTable('messages')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
