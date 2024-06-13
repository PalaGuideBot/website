import router from '@adonisjs/core/services/router'

import '#start/routes/stats'
import '#start/routes/leaderboard'
import '#start/routes/status'
import { HttpContext } from '@adonisjs/core/http'
import env from './env.js'

const HomeController = () => import('#controllers/home_controller')

router.get('/', [HomeController, 'index']).as('home')

router.get('/discord', (ctx: HttpContext) => {
  const url = env.get('DISCORD_INVITE_URL')

  if (!url) {
    return ctx.response.redirect().toRoute('home')
  }

  return ctx.response.redirect(url)
})
