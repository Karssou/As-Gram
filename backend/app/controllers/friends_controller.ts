import Friendship from '#models/friendship'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class FriendsController {
  public async store({ request, response, auth }: HttpContext) {
    const receiver = request.input('receiver_id')

    if (!receiver) {
      return response.notFound({ status: 'error', message: 'Utilisateur non trouvé' })
    }

    if (auth.user!.id === receiver) {
      return response.badRequest({
        status: 'error',
        message: "Tu ne peux pas t'ajouter toi-même !",
      })
    }

    // On cherche si la relation existe déjà
    const exists = await Friendship.query()
      .where('sender_id', auth.user!.id)
      .where('receiver_id', receiver)
      .orWhere('sender_id', receiver)
      .where('receiver_id', auth.user!.id)
      .first()

    // Si relation existante
    if (exists) {
      return response.badRequest({
        status: 'error',
        message: 'Demande déjà envoyée ou amis existant',
      })
    }

    // Création dans la DB
    Friendship.create({
      senderId: auth.user!.id,
      receiverId: receiver,
      status: 'pending',
    })

    return response.ok({ status: 'success', message: 'Demande envoyée !' })
  }

  public async accept({ request, response, auth }: HttpContext) {
    const sender = request.input('sender_id')

    if (!sender) {
      return response.notFound({ status: 'error', message: 'Utilisateur non trouvé.' })
    }

    const friendship = await Friendship.query()
      .where('receiver_id', auth.user!.id)
      .where('sender_id', sender)
      .where('status', 'pending')
      .first()

    if (!friendship) {
      return response.notFound({ status: 'error', message: 'Demande non trouvée.' })
    }

    friendship.status = 'accepted'
    await friendship.save()

    return response.ok({ status: 'success', message: 'Demande acceptée !' })
  }

  public async decline({ request, response, auth }: HttpContext) {
    const sender = request.input('sender_id')

    if (!sender) {
      return response.notFound({ status: 'error', message: 'Utilisateur non trouvé.' })
    }

    const friendship = await Friendship.query()
      .where('receiver_id', auth.user!.id)
      .where('sender_id', sender)
      .where('status', 'pending')
      .first()

    if (!friendship) {
      return response.notFound({ status: 'error', message: 'Demande non trouvée.' })
    }

    // Supprimer la demande
    await friendship.delete()

    return response.ok({ status: 'success', message: 'Demande refusée.' })
  }

  public async index({ auth }: HttpContext) {
    const userId = auth.user!.id

    // On cherche toutes les demandes / Recues / En attente
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
        created_at: req.createdAt.toMillis(),
        receiver: { id: req.receiver.id, username: req.receiver.username },
      }))

    const received = friendRequests
      .filter((req) => req.receiverId === userId && req.status === 'pending')
      .map((req) => ({
        id: req.id,
        created_at: req.createdAt.toMillis(),
        sender: { id: req.sender.id, username: req.sender.username },
      }))

    const friends = friendRequests
      .filter((req) => req.status === 'accepted')
      .map((req) => {
        const friend = req.senderId === userId ? req.receiver : req.sender
        return {
          id: req.id,
          created_at: req.createdAt.toMillis(),
          friend: { id: friend.id, username: friend.username },
        }
      })

    return { pending, received, friends }
  }

  public async destroy({ request, response, auth }: HttpContext) {
    const friend = request.input('friend_id')

    if (!friend) {
      return response.notFound({ status: 'error', message: 'Ami non trouvé.' })
    }

    const friendship = await Friendship.query()
      .where(function (query) {
        query
          .where('sender_id', auth.user!.id)
          .where('receiver_id', friend)
          .orWhere('sender_id', friend)
          .where('receiver_id', auth.user!.id)
      })
      .where('status', 'accepted')
      .first()

    if (!friendship) {
      return response.notFound({ status: 'error', message: "Cet utilisateur n'est pas un ami." })
    }

    await friendship.delete()

    return response.ok({ status: 'success', message: 'Ami supprimé.' })
  }

  public async search({ request, response }: HttpContext) {
    const query = request.input('q')

    if (!query) {
      return response.json([])
    }

    const friends = await User.query().whereILike('username', `%${query}%`).limit(10)

    return response.json(
      friends.map((friend) => ({
        id: friend.id,
        username: friend.username,
      }))
    )
  }
}
