import User from '#models/user'
import { AuthService } from '#services/auth_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register(ctx: HttpContext) {
    return await AuthService.registerUser(ctx)
  }

  async login(ctx: HttpContext) {
    return await AuthService.logUser(ctx)
  }

  async logout(ctx: HttpContext) {
    return await AuthService.logoutUser(ctx)
  }

  async me({ auth }: HttpContext) {
    await auth.check()
    return {
      user: auth.user,
    }
  }
}
