import Subscription from '#models/subscription'
import User from '#models/user'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { unlink } from 'node:fs/promises'
import { join } from 'node:path'

export class UserService {
  public static async getUserInformations(userId: number, myid: number) {
    try {
      const user = await User.find(userId)

      const isSubscribedToUser = await Subscription.query()
        .where('user_id', myid)
        .andWhere('subscribed_to', userId)
        .first()

      // Vérifier si cet utilisateur (userId) suit l'utilisateur courant (myid)
      const isUserSubscribed = await Subscription.query()
        .where('user_id', userId)
        .andWhere('subscribed_to', myid)
        .first()
      return { user, IsFollowByUser: !!isUserSubscribed, isFollowToUser: !!isSubscribedToUser }
    } catch (error) {
      console.log("Erreur lors de la récupération de l'utilisateur", error)
      throw new Error("Impossible de récupérer l'utilisateur")
    }
  }

  public static async updateAvatar(user: User, avatar: MultipartFile) {
    if (!avatar) {
      throw new Error('Aucun fichier envoyé')
    }

    if (!['jpg', 'jpeg', 'png', 'webp'].includes(avatar.extname || '')) {
      throw new Error('Extension de fichier non supporté')
    }

    if (avatar.size > 2 * 1024 * 1024) {
      throw new Error('Le fichier dépasse la taille de 2MB')
    }

    if (user.avatar && user.avatar.startsWith('/uploads/avatar/')) {
      const oldPath = join(app.publicPath(), user.avatar)
      try {
        await unlink(oldPath)
      } catch (err) {
        console.warn('Ancien avatar introuvable ou déjà supprimé:', oldPath)
      }
    }

    const fileName = `${user.id}_${Date.now()}.${avatar.extname}`

    await avatar.move(app.publicPath('uploads/avatar'), {
      name: fileName,
      overwrite: true,
    })

    user.avatar = `/uploads/avatar/${fileName}`
    await user.save()
  }
}
