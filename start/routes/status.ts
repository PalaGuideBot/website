import router from '@adonisjs/core/services/router'
const PaladiumController = () => import('#status/controllers/paladium_controller')

router
  .group(() => {
    router.get('/paladium', [PaladiumController, 'index']).as('paladium.index')
  })
  .prefix('status')
  .as('status')
