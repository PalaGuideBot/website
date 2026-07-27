import type { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'

router
  .group(() => {
    router
      .get('/', ({ inertia }: HttpContext) => inertia.render('leaderboard/index', {}))
      .as('index')
    router.get('/factions', [controllers.leaderboard.Factions, 'index']).as('factions.index')
    router.get('/money', [controllers.leaderboard.Money, 'index']).as('money.index')
    router.get('/trixium', [controllers.leaderboard.Trixium, 'index']).as('trixium.index')
    router.get('/clicker', [controllers.leaderboard.Clicker, 'index']).as('clicker.index')
    router.get('/boss', [controllers.leaderboard.Boss, 'index']).as('boss.index')
    router.get('/chorus', [controllers.leaderboard.Chorus, 'index']).as('chorus.index')
    router.get('/egghunt', [controllers.leaderboard.Egghunt, 'index']).as('egghunt.index')
    // router.get('/end', [controllers.leaderboard.End, 'index']).as('end.index')
    router.get('/koth', [controllers.leaderboard.Koth, 'index']).as('koth.index')
    router.get('/alignement', [controllers.leaderboard.Alliance, 'index']).as('alliance.index')
    router.get('/jobs', [controllers.leaderboard.Jobs, 'index']).as('jobs.index')
  })
  .prefix('leaderboard')
  .as('leaderboard')
