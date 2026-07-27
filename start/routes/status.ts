import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'

router
  .group(() => {
    router
      .get('/', ({ response }) => response.redirect().toRoute('status.paladium.index'))
      .as('index')
    router.get('/paladium', [controllers.status.Paladium, 'index']).as('paladium.index')
  })
  .prefix('status')
  .as('status')
