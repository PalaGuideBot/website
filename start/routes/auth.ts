import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/login', [controllers.Auth, 'login']).as('auth.login')
    router.get('/auth/redirect', [controllers.Auth, 'redirect']).as('auth.redirect')
    router.get('/auth/callback', [controllers.Auth, 'callback']).as('auth.callback')
  })
  .middleware(middleware.guest())

router
  .get('/profile', [controllers.Auth, 'profile'])
  .as('auth.profile')
  .middleware(middleware.auth())
router.get('/logout', [controllers.Auth, 'logout']).as('auth.logout')
