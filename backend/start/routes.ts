/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import { PusherService } from '#services/pusher_service'
import { MessageReactionService } from '#services/message_reaction_service'
import { PostService } from '#services/post_service'
import { ConversationService } from '#services/conversation_service'

const ConvsController = () => import('#controllers/convs_controller')
const UserController = () => import('#controllers/users_controller')
const FriendsController = () => import('#controllers/friends_controller')
const AuthController = () => import('#controllers/auth_controller')
const MessagesController = () => import('#controllers/messages_controller')

router.group(() => {
  router.post('/register', [AuthController, 'register']).as('auth.register')
  router.post('/login', [AuthController, 'login']).as('auth.login')
  router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
})

router
  .group(() => {
    router.post('/create', async ({ request }) => {
      const { content } = request.only(['content'])
      await PostService.createPost(content)
      return 'Ok'
    })

    router.post('/:postId/like', async ({ params }) => {
      const { postId } = params
      const userId = 1
      await PostService.likePost(postId, userId)
      return 'Ok'
    })
  })
  .prefix('posts')

router
  .group(() => {
    router.post('/create', [ConvsController, 'CreateConv'])

    router.post('/:conversationId/users', [ConvsController, 'AddUserToConv'])

    router.get('/:conversationId/users/:userId', [ConvsController, 'IsUserInConv'])

    router.delete('/:conversationId/users/:userId', [ConvsController, 'DeleteUser'])

    router.delete('/:conversationId/delete', [ConvsController, 'DeleteConv'])

    router.get('/:conversationId/users', [ConvsController, 'GetUserFromConv'])

    router.get('/:userId/conversation', async ({ params }) => {
      const { userId } = params
      const lala = await ConversationService.GetUserConv(userId)
      return lala
    })
  })
  .prefix('/conversation')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/get/:conversationId', [MessagesController, 'GetMessages'])

    router.post('/:conversationId/message/send', [MessagesController, 'SendMessage'])

    router.put('/:messageId/edit', [MessagesController, 'EditMessage'])

    router.delete('/:messageId/delete', [MessagesController, 'DeleteMessage'])

    router.delete('/:messageId/react/:userId', async ({ params }) => {
      const { messageId, userId } = params
      const reactions = await MessageReactionService.removeReaction(messageId, userId)
      return reactions
    })

    router.post('/:messageId/react/:userId', async ({ params, request }) => {
      const { reaction } = request.only(['reaction'])
      const { messageId, userId } = params
      const reactions = await MessageReactionService.addOrUpdateReaction(
        messageId,
        userId,
        reaction
      )
      return reactions
    })
  })
  .prefix('/messages')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/avatar', [UserController, 'updateAvatar'])
    router.patch('/update-information', [UserController, 'updateInformation'])
    router.get('/me', [AuthController, 'me']).as('auth.me')
  })
  .prefix('/user')
  .use(middleware.auth())

// FRIENDS

router
  .group(() => {
    router.get('/search', [FriendsController, 'search'])
    router.get('/index/friends', [FriendsController, 'index'])
    router.post('/request', [FriendsController, 'store'])
    router.post('/accept', [FriendsController, 'accept'])
    router.post('/declined', [FriendsController, 'decline'])
    router.post('/remove', [FriendsController, 'destroy'])
  })
  .use(middleware.auth())
  .prefix('/friends')

router
  .get('/hello-world', async () => {
    return { Salut: 'Salut' }
  })
  .use(middleware.auth())

router.post('/pusher/typing', async ({ request }) => {
  const { userId } = request.only(['userId'])
  const { conversationId } = request.only(['conversationId'])
  PusherService.sendTyping(Number(conversationId), Number(userId))
})
