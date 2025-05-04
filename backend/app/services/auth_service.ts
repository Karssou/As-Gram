import User from '#models/user'
import { LoginValidator, registerValidator } from '#validators/auth'
import { errors as Adoniserror } from '@adonisjs/auth'

import { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'

export class AuthService {
  public static async registerUser(ctx: HttpContext) {
    try {
      const validatedData = await ctx.request.validateUsing(registerValidator)
      const user = await User.create(validatedData)
      user.avatar = 'uploads/avatar/default.png'
      await user.save()
      await user.refresh()

      const token = await this.generateToken(user)

      return ctx.response.status(201).json({
        messages: 'Inscription Réussi',
        token,
        user: user,
      })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return ctx.response.badRequest({
          status: 'validation_error',
          messages: error.messages,
        })
      }

      console.error('[AuthService] registerUser error:', error)

      return {
        status: 'error',
        message: "Une erreur est survenue pendant l'inscription",
      }
    }
  }

  public static async logUser(ctx: HttpContext) {
    try {
      const { password, email } = await ctx.request.validateUsing(LoginValidator)

      const user = await User.verifyCredentials(email, password)

      const token = await this.generateToken(user)

      return ctx.response.status(201).json({
        messages: 'Connection Réussi',
        token,
        user: user,
      })
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return ctx.response.badRequest({
          status: 'validation_error',
          messages: error.messages,
        })
      }

      if (error instanceof Adoniserror.E_INVALID_CREDENTIALS) {
        return ctx.response.badRequest({
          status: 'invalid_credentials',
          messages: 'Mot de passe ou email inexistant',
        })
      }
      console.error('[AuthService] registerUser error:', error)

      return {
        status: 'error',
        message: 'Une erreur est survenue pendant la connection',
      }
    }
  }

  public static async logoutUser(ctx: HttpContext) {
    try {
      const user = ctx.auth.user!
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
      return ctx.response.ok({ status: 'success', message: 'Vous êtes déonnecté' })
    } catch (error) {
      return ctx.response.badRequest({
        message: 'Une erreur est survenu lors du logout',
        status: 'error',
      })
    }
  }

  public static async generateToken(user: User) {
    return User.accessTokens.create(user, ['*'], {
      expiresIn: '5days',
      name: `asgram.session.user-${user.id}`,
    })
  }
}
