import router from '@adonisjs/core/services/router'

const ClickerController = () => import('#tools/controller/clicker_controller')

router
  .group(() => {
    router.get('/clicker/:username?', [ClickerController, 'show']).as('clicker.show')
  })
  .prefix('tools')
  .as('tools')
