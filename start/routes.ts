import '#start/routes/auth'
import '#start/routes/event'
import '#start/routes/leaderboard'
import '#start/routes/minecraft'
import '#start/routes/staff'
import '#start/routes/stats'
import '#start/routes/status'
import '#start/routes/tools'

import { middleware } from '#start/kernel'

import router from '@adonisjs/core/services/router'
import transmit from '@adonisjs/transmit/services/main'

transmit.registerRoutes((route) => {
  // Ensure you are authenticated to register your client
  if (route.getPattern() === '__transmit/events') {
    route.middleware([middleware.auth(), middleware.staff()])
    return
  }
})

const PageController = () => import('#controllers/page_controller')

router.group(() => {
  router.get('/', [PageController, 'home']).as('home')
  router.get('/informations', [PageController, 'informations']).as('informations')
  router.get('/discord', [PageController, 'discord']).as('discord')
  router.get('/privacy', [PageController, 'privacy']).as('privacy')
  router.get('/terms', [PageController, 'terms']).as('terms')
  router.get('/changelog', [PageController, 'changelog']).as('changelog')
  router.get('/know-everything', [PageController, 'know_everything']).as('know_everything')
  router.get('/faq', [PageController, 'faq']).as('faq')
})
