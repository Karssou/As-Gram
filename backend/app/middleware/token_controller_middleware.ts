import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const authorization = ctx.request.header('Authorization')

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return ctx.response.unauthorized({ message: 'Token manquant ou invalide' })
    }

    // Passe à la prochaine étape si le token est valide
    return next()
  }
}
