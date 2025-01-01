import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

const GiveawayController = () => import('#staff/controllers/giveaway_controller')
const RoleController = () => import('#staff/controllers/role_controller')
const UserController = () => import('#staff/controllers/user_controller')
const DashboardController = () => import('#staff/controllers/dashboard_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [DashboardController, 'index']).as('staff.dashboard')
        router
          .group(() => {
            router.get('/', [UserController, 'index']).as('staff.users.index')
            router.post('/', [UserController, 'create']).as('staff.users.create')
            router.put('/:id', [UserController, 'update']).as('staff.users.update')
            router.delete('/:id', [UserController, 'destroy']).as('staff.users.destroy')
          })
          .prefix('/users')
        router
          .group(() => {
            router.get('/', [RoleController, 'index']).as('staff.roles.index')
            router.post('/', [RoleController, 'create']).as('staff.roles.create')
            router.put('/:name', [RoleController, 'update']).as('staff.roles.update')
            router.delete('/:name', [RoleController, 'destroy']).as('staff.roles.destroy')
          })
          .prefix('/roles')
        router
          .group(() => {
            router.get('/', [GiveawayController, 'index']).as('staff.giveaways.index')
            router.post('/', [GiveawayController, 'create']).as('staff.giveaways.create')
            router.put('/:id', [GiveawayController, 'update']).as('staff.giveaways.update')
            router.delete('/:id', [GiveawayController, 'destroy']).as('staff.giveaways.destroy')
            router.post('/:id/draw', [GiveawayController, 'draw']).as('staff.giveaways.draw')
          })
          .prefix('/giveaways')
      })
      .middleware([middleware.auth(), middleware.staff()])
  })
  .prefix('/staff')
