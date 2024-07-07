import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    router.get('/login', [AuthController, 'login']).as('auth.login')
    router.get('/auth/redirect', [AuthController, 'redirect']).as('auth.redirect')
    router.get('/auth/callback', [AuthController, 'callback']).as('auth.callback')
  })
  .middleware(middleware.guest())

router.get('/profile', [AuthController, 'profile']).as('auth.profile').middleware(middleware.auth())
router.get('/logout', [AuthController, 'logout']).as('auth.logout')
