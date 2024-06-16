import '#start/routes/leaderboard'
import '#start/routes/staff'
import '#start/routes/stats'
import '#start/routes/status'

import router from '@adonisjs/core/services/router'

const PageController = () => import('#controllers/page_controller')

router.group(() => {
  router.get('/', [PageController, 'home']).as('home')
  router.get('/discord', [PageController, 'discord']).as('discord')
  router.get('/privacy', [PageController, 'privacy']).as('privacy')
  router.get('/terms', [PageController, 'terms']).as('terms')
  router.get('/changelogs', [PageController, 'changelogs']).as('changelogs')
})
