/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const UsersController = () => import('../app/stats/controllers/users_controller.js')

router.on('/').renderInertia('home')

router
  .group(() => {
    router.get('/users/:username?', [UsersController, 'show']).as('users.show')
  })
  .prefix('stats')
  .as('stats')
