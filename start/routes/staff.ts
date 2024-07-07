import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const DashboardController = () => import('#staff/controllers/dashboard_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [DashboardController, 'index']).as('staff.dashboard')
      })
      .middleware([middleware.auth(), middleware.discordId()])
  })
  .prefix('/staff')
