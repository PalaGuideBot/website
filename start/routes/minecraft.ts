import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router
      .post('/link/generate-token', [controllers.Minecraft, 'generateToken'])
      .as('generateToken')
    router.delete('/unlink', [controllers.Minecraft, 'unlinkAccount']).as('unlinkAccount')
  })
  .prefix('minecraft')
  .as('minecraft')
  .middleware([middleware.auth()])
