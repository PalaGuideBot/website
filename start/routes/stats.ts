import router from '@adonisjs/core/services/router'

const UsersController = () => import('#stats/controllers/users_controller')
const FactionsController = () => import('#stats/controllers/factions_controller')

router
  .group(() => {
    router.get('/users/:username?', [UsersController, 'show']).as('users.show')
    router.get('/factions/:name?', [FactionsController, 'show']).as('factions.show')
  })
  .prefix('stats')
  .as('stats')
