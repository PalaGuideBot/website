import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

const FactionsController = () => import('#leaderboard/controllers/factions_controller')
const MoneyController = () => import('#leaderboard/controllers/money_controller')
const TrixiumController = () => import('#leaderboard/controllers/trixium_controller')
const ClickerController = () => import('#leaderboard/controllers/clicker_controller')
const BossController = () => import('#leaderboard/controllers/boss_controller')
// const ChorusController = () => import('#leaderboard/controllers/chorus_controller')
const EgghuntController = () => import('#leaderboard/controllers/egghunt_controller')
// const EndController = () => import('#leaderboard/controllers/end_controller')
const KothController = () => import('#leaderboard/controllers/koth_controller')

router
  .group(() => {
    router.get('/', ({ inertia }: HttpContext) => inertia.render('leaderboard/index')).as('index')
    router.get('/factions', [FactionsController, 'index']).as('factions.index')
    router.get('/money', [MoneyController, 'index']).as('money.index')
    router.get('/trixium', [TrixiumController, 'index']).as('trixium.index')
    router.get('/clicker', [ClickerController, 'index']).as('clicker.index')
    router.get('/boss', [BossController, 'index']).as('boss.index')
    // router.get('/chorus', [ChorusController, 'index']).as('chorus.index')
    router.get('/egghunt', [EgghuntController, 'index']).as('egghunt.index')
    // router.get('/end', [EndController, 'index']).as('end.index')
    router.get('/koth', [KothController, 'index']).as('koth.index')
  })
  .prefix('leaderboard')
  .as('leaderboard')
