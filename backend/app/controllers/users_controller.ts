import { UserService } from '#services/user_service'
import { UpdateUserValidator } from '#validators/user_update'
import type { HttpContext } from '@adonisjs/core/http'


export default class UserController {
  public async updateInformation({ request, auth, response }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized({ message: 'Utilisateur non authentifié' })
      }

      const payload: any = await request.validateUsing(UpdateUserValidator, {
        meta: { userId: user.id },
      })

      user.merge(payload)
      await user.save()

      return response.ok({
        status: 'success',
        message: 'Informations mises à jour avec succès',
        user,
      })
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil', error)
      return response.badRequest({
        status: 'error',
        message: 'Erreur lors de la mise à jour du profil',
        error: error.messages || error.message,
      })
    }
  }

  public async updateAvatar({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const avatar = request.file('avatar')

    try {
      const avatarUrl = await UserService.updateAvatar(user, avatar!)
      return response.ok({
        message: 'Avatar mis à jour',
        avatar: avatarUrl,
      })
    } catch (err) {
      return response.badRequest({
        status: 'error',
        message: err.message,
      })
    }
  }
}
