import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { ApiService } from '#core/services/api'

@inject()
export default class DashboardController {
  constructor(private api: ApiService) {}

  async index({ inertia }: HttpContext) {
    const [stats, latestPlayers] = await Promise.all([
      this.api.getUsageStatistics(),
      this.api.getLatestPlayers(),
    ])

    return inertia.render('staff/dashboard/index', { stats, latestPlayers })
  }
}
