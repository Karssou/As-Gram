import Post from '#models/post'
import Subscription from '#models/subscription'
import User from '#models/user'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { unlink } from 'node:fs/promises'
import { join } from 'node:path'

export class UserService {
  public static async getUserInformations(userId: number, currentUserId: number) {
    try {
      const user = await User.find(userId)

      const followersCount = await Subscription.query()
        .where('subscribed_to', userId)
        .count('* as total')
      const followingCount = await Subscription.query().where('user_id', userId).count('* as total')
      const postsCount = await Post.query().where('user_id', userId).count('* as total')

      const isFollowedByYou = !!(await Subscription.query()
        .where('user_id', currentUserId)
        .andWhere('subscribed_to', userId)
        .first())

      const isFollowingYou = !!(await Subscription.query()
        .where('user_id', userId)
        .andWhere('subscribed_to', currentUserId)
        .first())

      const isFriend = !!isFollowingYou && !!isFollowedByYou

      return {
        user,
        stats: {
          followersCount: Number(followersCount[0].$extras.total),
          followingCount: Number(followingCount[0].$extras.total),
          postsCount: Number(postsCount[0].$extras.total),
        },
        relations: {
          isFollowedByYou,
          isFollowingYou,
          isFriend,
        },
      }
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
