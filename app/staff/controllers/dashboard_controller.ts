import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DashboardController {
  constructor(private api: ApiService) {}

  async index({ inertia }: HttpContext) {
    const stats = await this.api.getStaffStatistics()
    return inertia.render('staff/dashboard/index', { stats })
  }
}
