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
const FriendsController = () => import('#controllers/friends_controller')

const AuthController = () => import('#controllers/auth_controller')

router.post('/register', [AuthController, 'register']).as('auth.register')
router.post('/login', [AuthController, 'login']).as('auth.login')
router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
router.get('/me', [AuthController, 'me']).as('auth.me')
router
  .get('/salut', async () => {
    return { message: 'salut' }
  })
  .use(middleware.auth())

// FRIENDS

router
  .group(() => {
    router.get('/index/friends', [FriendsController, 'index'])
    router.get('/index/request', [FriendsController, 'pendingRequests'])
    router.post('/request', [FriendsController, 'store'])
    router.post('/accept', [FriendsController, 'accept'])
    router.post('/declined', [FriendsController, 'decline'])
    router.post('/remove', [FriendsController, 'destroy'])
  })
  .use(middleware.auth())
  .prefix('/friends')
