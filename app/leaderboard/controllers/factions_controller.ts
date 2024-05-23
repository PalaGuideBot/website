import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class FactionsController {
  constructor(private api: ApiService) {}
  async index({ inertia }: HttpContext) {
    const leaderboard = await this.api.getLeaderboard('factions')
    return inertia.render('leaderboard/factions/index', { leaderboard })
  }
}
