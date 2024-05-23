import router from '@adonisjs/core/services/router'

import '#start/routes/stats'
import '#start/routes/leaderboard'

router.on('/').renderInertia('home')
