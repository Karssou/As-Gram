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
const UserController = () => import('#controllers/users_controller')
const FriendsController = () => import('#controllers/friends_controller')
const AuthController = () => import('#controllers/auth_controller')

router.group(() => {
  router.post('/register', [AuthController, 'register']).as('auth.register')
  router.post('/login', [AuthController, 'login']).as('auth.login')
  router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
})

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
