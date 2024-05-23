import router from '@adonisjs/core/services/router'

const UsersController = () => import('#stats/controllers/users_controller')

router
  .group(() => {
    router.get('/users/:username?', [UsersController, 'show']).as('users.show')
  })
  .prefix('stats')
  .as('stats')
