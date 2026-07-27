import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'

router
  .group(() => {
    router.get('/players/:username?', [controllers.stats.Player, 'show']).as('players.show')
    router.post('/players/:username/jobs', [controllers.stats.Player, 'jobs']).as('players.jobs')
    router.get('/players/:username/og', [controllers.stats.Player, 'openGraph']).as('players.og')
    router.post('/players/search', [controllers.stats.Player, 'search']).as('players.search')
    router.get('/factions/:name?', [controllers.stats.Faction, 'show']).as('factions.show')
    router.get('/wrapped/:username?', [controllers.stats.Player, 'wrapped']).as('players.wrapped')
    router
      .get('/wrapped/:username/end', [controllers.stats.Player, 'wrappedEnd'])
      .as('players.wrapped.end')
  })
  .as('stats')
