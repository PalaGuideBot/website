import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router.get('/events', [controllers.event.Event, 'index'])

router
  .group(() => {
    router.get('/', [controllers.event.Giveaway, 'index'])
    router
      .post('/participate', [controllers.event.Giveaway, 'participate'])
      .middleware(middleware.auth())
  })
  .prefix('/giveaway')
