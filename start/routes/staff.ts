const AuthController = () => import('#staff/controllers/auth_controller')
const DashboardController = () => import('#staff/controllers/dashboard_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router
      .group(() => {
        router.get('/login', [AuthController, 'login']).as('staff.login')
        router.get('/auth/redirect', [AuthController, 'redirect']).as('staff.redirect')
        router.get('/auth/callback', [AuthController, 'callback']).as('staff.callback')
      })
      .middleware(middleware.guest())

    router
      .group(() => {
        router.get('/', [DashboardController, 'index']).as('staff.dashboard')
      })
      .middleware(middleware.auth())

    router.get('/logout', [AuthController, 'logout']).as('staff.logout')
  })
  .prefix('/staff')
