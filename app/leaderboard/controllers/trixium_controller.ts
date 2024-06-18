import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TrixiumController {
  constructor(private api: ApiService) {}
  async index({ inertia }: HttpContext) {
    const leaderboardFaction = await this.api.getLeaderboard('trixfaction')
    const leaderboardPlayer = await this.api.getLeaderboard('trixuser')
    return inertia.render('leaderboard/trixium/index', { leaderboardFaction, leaderboardPlayer })
  }
}
