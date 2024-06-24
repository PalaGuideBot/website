import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TrixiumController {
  constructor(private api: ApiService) {}
  async index({ inertia }: HttpContext) {
    const { faction: leaderboardFaction, user: leaderboardPlayer } =
      await this.api.getLeaderboard('trixium')
    return inertia.render('leaderboard/trixium/index', { leaderboardFaction, leaderboardPlayer })
  }
}
