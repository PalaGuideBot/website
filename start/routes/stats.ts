import router from '@adonisjs/core/services/router'

const PlayerController = () => import('#stats/controllers/player_controller')
const FactionController = () => import('#stats/controllers/faction_controller')

router
  .group(() => {
    router.get('/players/:username?', [PlayerController, 'show']).as('players.show')
    router.post('/players/:username/jobs', [PlayerController, 'jobs']).as('players.jobs')
    router.get('/players/:username/og', [PlayerController, 'openGraph']).as('players.og')
    router.post('/players/search', [PlayerController, 'search']).as('players.search')
    router.get('/factions/:name?', [FactionController, 'show']).as('factions.show')
    router.get('/wrapped/:username?', [PlayerController, 'wrapped']).as('players.wrapped')
    router.get('/wrapped/:username/end', [PlayerController, 'wrappedEnd']).as('players.wrapped.end')
  })
  .as('stats')
