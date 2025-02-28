import User from '#models/user'
import { LoginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)

    return User.accessTokens.create(user, ['*'])
  }

  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginValidator)
    const user = await User.verifyCredentials(email, password)

    return User.accessTokens.create(user, ['*'])
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
  }

  async me({ auth }: HttpContext) {
    await auth.check()
    return {
      user: auth.user,
    }
  }
}
