import User from '#models/user'
import { LoginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  // Fonction pour le REGISTER

  async register({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(registerValidator)
      const user = await User.create(data)

      return (
        await User.accessTokens.create(user, ['*'], {
          expiresIn: '1min',
        }),
        response.status(201).json({
          message: 'Utilisateur créé avec succès',
        })
      )
    } catch (error) {
      return response.json({
        messages: 'Création échouée',
        Erreur: error,
      })
    }
  }
  // Fonction pour le LOGIN
  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(LoginValidator)
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user, ['*'], {
        expiresIn: '1min',
      })

      return response.status(200).header('bearer').json({
        expireat: token.expiresAt,
      })
    } catch (error) {
      return response.json({
        messages: 'Connexion échouée',
        Erreur: error,
      })
    }
  }

  // Fonction pour le LOGOUT
  async logout({ auth, response }: HttpContext) {
    try {
      const user = auth.user!
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
      return { message: 'success ' }
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Erreur lors de la déconnexion' })
    }
  }

  async me({ auth }: HttpContext) {
    await auth.check()
    return {
      user: auth.user,
    }
  }
}
