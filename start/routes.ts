import router from '@adonisjs/core/services/router'

import '#start/routes/leaderboard'
import '#start/routes/stats'
import '#start/routes/status'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { readFile } from 'node:fs/promises'
import env from '#start/env'

const HomeController = () => import('#controllers/home_controller')

router.get('/', [HomeController, 'index']).as('home')

router.get('/discord', (ctx: HttpContext) => {
  const url = env.get('DISCORD_INVITE_URL')

  if (!url) {
    return ctx.response.redirect().toRoute('home')
  }

  return ctx.response.redirect(url)
})

router.get('/privacy', async (ctx: HttpContext) => {
  const content = await readFile(app.makePath('resources/static/pages/privacy.md'), 'utf-8')
  return ctx.inertia.render('privacy', { content })
})

router.get('/terms', async (ctx: HttpContext) => {
  const content = await readFile(app.makePath('resources/static/pages/terms.md'), 'utf-8')
  return ctx.inertia.render('terms', { content })
})
