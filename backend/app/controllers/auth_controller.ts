import User from '#models/user'
import { LoginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(registerValidator)
      const user = await User.create(data)
      user.avatar = 'public/uploads/avatar/default.png'
      user.save()

      return await User.accessTokens.create(user, ['*'], {
        expiresIn: '30days',
      })
    } catch (error) {
      return response.json({
        messages: error,
        status: 'error',
      })
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(LoginValidator)
      const user = await User.verifyCredentials(email, password)

      return await User.accessTokens.create(user, ['*'], {
        expiresIn: '30days',
      })
    } catch (error) {
      return response.json({
        message: error,
        status: 'error',
      })
    }
  }

  // Fonction pour le LOGOUT
  async logout({ auth, response }: HttpContext) {
    try {
      const user = auth.user!
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
      return response.ok({ status: 'success', message: 'Vous êtes déonnecté' })
    } catch (error) {
      console.error(error)
      return response.status(500).badRequest({ message: error, status: 'error' })
    }
  }

  async me({ auth }: HttpContext) {
    await auth.check()
    return {
      user: auth.user,
    }
  }
}
