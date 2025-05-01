import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('likes')
      table.integer('comments')
      table.integer('love')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('likes')
      table.dropColumn('comments')
      table.dropColumn('love')
    })
  }
}
