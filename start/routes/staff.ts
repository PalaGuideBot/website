import router from '@adonisjs/core/services/router'

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [controllers.staff.Dashboard, 'index']).as('staff.dashboard')
        router
          .group(() => {
            router.get('/', [controllers.staff.User, 'index']).as('staff.users.index')
            router.post('/', [controllers.staff.User, 'create']).as('staff.users.create')
            router.put('/:id', [controllers.staff.User, 'update']).as('staff.users.update')
            router.delete('/:id', [controllers.staff.User, 'destroy']).as('staff.users.destroy')
          })
          .prefix('/users')
        router
          .group(() => {
            router.get('/', [controllers.staff.Role, 'index']).as('staff.roles.index')
            router.post('/', [controllers.staff.Role, 'create']).as('staff.roles.create')
            router.put('/:name', [controllers.staff.Role, 'update']).as('staff.roles.update')
            router.delete('/:name', [controllers.staff.Role, 'destroy']).as('staff.roles.destroy')
          })
          .prefix('/roles')
        router
          .group(() => {
            router.get('/', [controllers.staff.Giveaway, 'index']).as('staff.giveaways.index')
            router.post('/', [controllers.staff.Giveaway, 'create']).as('staff.giveaways.create')
            router.put('/:id', [controllers.staff.Giveaway, 'update']).as('staff.giveaways.update')
            router
              .delete('/:id', [controllers.staff.Giveaway, 'destroy'])
              .as('staff.giveaways.destroy')
            router
              .post('/:id/draw', [controllers.staff.Giveaway, 'draw'])
              .as('staff.giveaways.draw')
            router.delete('/:id/participants/:participantId', [
              controllers.staff.Giveaway,
              'deleteParticipant',
            ])
          })
          .prefix('/giveaways')
      })
      .middleware([middleware.auth(), middleware.staff()])
  })
  .prefix('/staff')
