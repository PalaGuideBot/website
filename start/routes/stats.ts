import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const PlayerController = () => import('#stats/controllers/player_controller')
const FactionController = () => import('#stats/controllers/faction_controller')

router
  .group(() => {
    router.get('/players/:username?', [PlayerController, 'show']).as('players.show')
    router.post('/players/:username/jobs', [PlayerController, 'jobs']).as('players.jobs')
    router.get('/factions/:name?', [FactionController, 'show']).as('factions.show')
    router
      .get('/wrapped', [PlayerController, 'wrapped'])
      .as('players.wrapped')
      .middleware([middleware.auth()])
    router
      .get('/wrapped/end', [PlayerController, 'wrappedEnd'])
      .as('players.wrapped.end')
      .middleware([middleware.auth()])
  })
  .as('stats')
