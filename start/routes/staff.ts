import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

const DashboardController = () => import('#staff/controllers/dashboard_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [DashboardController, 'index']).as('staff.dashboard')
      })
      .middleware([middleware.auth(), middleware.staff()])
  })
  .prefix('/staff')
