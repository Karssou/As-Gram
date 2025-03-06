import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

export default class AuthMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    // await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
    // return next()

    try {
      await ctx.auth.authenticateUsing(options.guards)
      return await next()
    } catch (error) {
      console.error("Erreur d'authentification", error)

      return ctx.response.unauthorized({
        messages: 'Accès non autorisé. Veuillez vous connecter',
      })
    }
  }
}
