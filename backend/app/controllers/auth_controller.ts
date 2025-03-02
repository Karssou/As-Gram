import User from '#models/user'
import { LoginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  // Fonction pour le REGISTER
  public async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)
    const token = await User.accessTokens.create(user, ['*'])
    return response.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
        created_at: user.createdAt,
      },
      token: token.value,
    })
  }

  // Fonction pour le LOGIN
  public async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginValidator)
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user, ['*'])

    return response.json({
      message: 'Connexion réussie',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.createdAt,
      },
      token: token.value,
    })
  }

  // Fonction pour le LOGOUT
  public async logout({ auth }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
  }

  // Fonction pour récupérer les infos du user
  public async me({ auth }: HttpContext) {
    await auth.check()
    return {
      user: auth.user,
    }
  }
}
