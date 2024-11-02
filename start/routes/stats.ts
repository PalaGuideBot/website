import router from '@adonisjs/core/services/router'

const PlayerController = () => import('#stats/controllers/player_controller')
const FactionController = () => import('#stats/controllers/faction_controller')

router
  .group(() => {
    router.get('/players/:username?', [PlayerController, 'show']).as('players.show')
    router.post('/players/:username/jobs', [PlayerController, 'jobs']).as('players.jobs')
    router.get('/factions/:name?', [FactionController, 'show']).as('factions.show')
  })
  .as('stats')
