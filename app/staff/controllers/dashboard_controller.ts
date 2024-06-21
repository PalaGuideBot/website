import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DashboardController {
  constructor(private api: ApiService) {}

  async index({ inertia }: HttpContext) {
    let stats = await this.api.getStaffStatistics()
    stats = stats.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return inertia.render('staff/dashboard/index', { stats })
  }
}
