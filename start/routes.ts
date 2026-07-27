import '#start/routes/auth'
import '#start/routes/event'
import '#start/routes/leaderboard'
import '#start/routes/minecraft'
import '#start/routes/staff'
import '#start/routes/stats'
import '#start/routes/status'
import '#start/routes/tools'

import router from '@adonisjs/core/services/router'
import transmit from '@adonisjs/transmit/services/main'

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

transmit.registerRoutes((route) => {
  // Ensure you are authenticated to register your client
  if (route.getPattern() === '__transmit/events') {
    route.middleware([middleware.auth(), middleware.staff()])
    return
  }
})

router.group(() => {
  router.get('/', [controllers.Page, 'home']).as('home')
  router.get('/informations', [controllers.Page, 'informations']).as('informations')
  router.get('/discord', [controllers.Page, 'discord']).as('discord')
  router.get('/privacy', [controllers.Page, 'privacy']).as('privacy')
  router.get('/terms', [controllers.Page, 'terms']).as('terms')
  router.get('/changelog', [controllers.Page, 'changelog']).as('changelog')
  router.get('/know-everything', [controllers.Page, 'know_everything']).as('know_everything')
  router.get('/faq', [controllers.Page, 'faq']).as('faq')
  router.get('/og', [controllers.Page, 'openGraph']).as('og')
})
