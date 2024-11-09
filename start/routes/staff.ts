import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

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
      })
      .middleware([middleware.auth(), middleware.staff()])
  })
  .prefix('/staff')
