import '#start/routes/auth'
import '#start/routes/leaderboard'
import '#start/routes/minecraft'
import '#start/routes/staff'
import '#start/routes/stats'
import '#start/routes/status'

import router from '@adonisjs/core/services/router'

const PageController = () => import('#controllers/page_controller')

router.group(() => {
  router.get('/', [PageController, 'home']).as('home')
  router.get('/informations', [PageController, 'informations']).as('informations')
  router.get('/discord', [PageController, 'discord']).as('discord')
  router.get('/privacy', [PageController, 'privacy']).as('privacy')
  router.get('/terms', [PageController, 'terms']).as('terms')
  router.get('/changelog', [PageController, 'changelog']).as('changelog')
  router.get('/381f2e6d-f69b-40a5-859b-33d3da1298f7.txt', [PageController, 'index']).as('index')
  router.get('/sitemap.xml', [PageController, 'sitemap']).as('sitemap')
})
