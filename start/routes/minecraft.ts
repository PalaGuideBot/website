import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const MinecraftController = () => import('#controllers/minecraft_controller')

router
  .group(() => {
    router.post('/link/generate-token', [MinecraftController, 'generateToken']).as('generateToken')
    router.delete('/unlink', [MinecraftController, 'unlinkAccount']).as('unlinkAccount')
  })
  .prefix('minecraft')
  .as('minecraft')
  .middleware([middleware.auth()])
