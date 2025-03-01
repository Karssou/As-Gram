import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async GetUser({ auth }: HttpContext) {
    return auth.user
  }
}
