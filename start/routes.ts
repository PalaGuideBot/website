import router from '@adonisjs/core/services/router'

import '#start/routes/stats'
import '#start/routes/leaderboard'
import '#start/routes/status'

const HomeController = () => import('#controllers/home_controller')

router.get('/', [HomeController, 'index'])
