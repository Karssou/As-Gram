import Friendship from '#models/friendship'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class FriendsController {
  public async store({ request, response, auth }: HttpContext) {
    const receiverPseudo = request.input('receiver_pseudo')

    const receiver = await User.query().where('username', receiverPseudo).first()

    if (!receiver) {
      return response.notFound({ message: 'Utilisateur non trouvé' })
    }

    if (auth.user!.id === receiver.id) {
      return response.badRequest({ message: "Tu ne peux pas t'ajouter toi-même !" })
    }

    const exists = await Friendship.query()
      .where('sender_id', auth.user!.id)
      .where('receiver_id', receiver.id)
      .orWhere('sender_id', receiver.id)
      .where('receiver_id', auth.user!.id)
      .first()

    if (exists) {
      return response.badRequest({ message: 'Demande déjà envoyée ou amis existant' })
    }

    const friendship = Friendship.create({
      senderId: auth.user!.id,
      receiverId: receiver.id,
      status: 'pending',
    })

    return response.ok({ message: 'Demande envoyée !', friendship })
  }
  public async accept({ request, response, auth }: HttpContext) {
    const senderPseudo = request.input('sender_pseudo')

    const sender = await User.query().where('username', senderPseudo).first()

    if (!sender) {
      return response.notFound({ message: 'Utilisateur non trouvé.' })
    }

    const friendship = await Friendship.query()
      .where('receiver_id', auth.user!.id)
      .where('sender_id', sender.id)
      .where('status', 'pending')
      .first()

    if (!friendship) {
      return response.notFound({ message: 'Demande non trouvée.' })
    }

    friendship.status = 'accepted'
    await friendship.save()

    return response.ok({ message: 'Demande acceptée !' })
  }

  public async decline({ request, response, auth }: HttpContext) {
    const senderPseudo = request.input('sender_pseudo')

    const sender = await User.query().where('username', senderPseudo).first()

    if (!sender) {
      return response.notFound({ message: 'Utilisateur non trouvé.' })
    }

    const friendship = await Friendship.query()
      .where('receiver_id', auth.user!.id)
      .where('sender_id', sender.id)
      .where('status', 'pending')
      .first()

    if (!friendship) {
      return response.notFound({ message: 'Demande non trouvée.' })
    }

    // Supprimer la demande
    await friendship.delete()

    return response.ok({ message: 'Demande refusée.' })
  }

  public async index({ auth }: HttpContext) {
    const userId = auth.user!.id

    const friendRequests = await Friendship.query()
      .where('sender_id', userId)
      .orWhere('receiver_id', userId)
      .preload('sender', (query) => query.select('id', 'username'))
      .preload('receiver', (query) => query.select('id', 'username'))

    // Organiser les données en trois catégories
    const pending = friendRequests
      .filter((req) => req.senderId === userId && req.status === 'pending')
      .map((req) => ({
        id: req.id,
        created_at: req.createdAt,
        receiver: { id: req.receiver.id, username: req.receiver.username },
      }))

    const received = friendRequests
      .filter((req) => req.receiverId === userId && req.status === 'pending')
      .map((req) => ({
        id: req.id,
        created_at: req.createdAt,
        sender: { id: req.sender.id, username: req.sender.username },
      }))

    const friends = friendRequests
      .filter((req) => req.status === 'accepted')
      .map((req) => {
        const friend = req.senderId === userId ? req.receiver : req.sender
        return {
          id: req.id,
          created_at: req.createdAt,
          friend: { id: friend.id, username: friend.username },
        }
      })

    return { pending, received, friends }
  }

  public async pendingRequests({ auth, response }: HttpContext) {
    const pendingFriendRequests = await Friendship.query()
      .where('receiver_id', auth.user!.id)
      .where('status', 'pending')
      .preload('sender', (query) => {
        query.select('username')
      })

    return response.ok(pendingFriendRequests)
  }

  public async destroy({ request, response, auth }: HttpContext) {
    const friendPseudo = request.input('friend_pseudo')

    const friend = await User.query().where('username', friendPseudo).first()

    if (!friend) {
      return response.notFound({ message: 'Ami non trouvé.' })
    }

    const friendship = await Friendship.query()
      .where(function (query) {
        query
          .where('sender_id', auth.user!.id)
          .where('receiver_id', friend.id)
          .orWhere('sender_id', friend.id)
          .where('receiver_id', auth.user!.id)
      })
      .where('status', 'accepted')
      .first()

    if (!friendship) {
      return response.notFound({ message: "Cet utilisateur n'est pas un ami." })
    }

    await friendship.delete()

    return response.ok({ message: 'Ami supprimé.' })
  }
}
