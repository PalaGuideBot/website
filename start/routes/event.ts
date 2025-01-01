import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

const GiveawayController = () => import('#event/controllers/giveaway_controller')
const EventController = () => import('#event/controllers/event_controller')

router.get('/events', [EventController, 'index'])

router
  .group(() => {
    router.get('/', [GiveawayController, 'index'])
    router.post('/participate', [GiveawayController, 'participate']).middleware(middleware.auth())
  })
  .prefix('/giveaway')
