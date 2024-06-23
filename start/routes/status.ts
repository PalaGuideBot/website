import router from '@adonisjs/core/services/router'
const PaladiumController = () => import('#status/controllers/paladium_controller')

router
  .group(() => {
    router
      .get('/', ({ response }) => response.redirect().toRoute('status.paladium.index'))
      .as('index')
    router.get('/paladium', [PaladiumController, 'index']).as('paladium.index')
  })
  .prefix('status')
  .as('status')
