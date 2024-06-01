import router from '@adonisjs/core/services/router'

import '#start/routes/stats'
import '#start/routes/leaderboard'
import '#start/routes/status'

router.on('/').renderInertia('home')
