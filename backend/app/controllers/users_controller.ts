import { UpdateUserValidator } from '#validators/user_update'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class UserController {
  public async updateInformation({ request, auth, response }: HttpContext) {
    try {
      // Vérifier l'utilisateur connecté
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

    const avatar = request.file('avatar', {
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
      size: '2mb',
    })

    if (!avatar) {
      return response.badRequest({
        message: 'Veuillez envoyez une photo de profil',
        status: 'error',
      })
    }

    const fileName = `${user.id}_${Date.now()}.${avatar.extname}`

    await avatar.move(app.makePath('storage/avatar'), {
      name: fileName,
      overwrite: true,
    })

    user.avatar = `/uploads/${fileName}`
    await user.save()

    return response.ok({
      message: 'Avatar mis à jour avec succès',
      avatar: user.avatar,
    })
  }
}
