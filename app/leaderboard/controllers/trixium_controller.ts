import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TrixiumController {
  constructor(private api: ApiService) {}
  async index({ inertia, request }: HttpContext) {
    let leaderboardFaction: Awaited<ReturnType<typeof this.api.getLeaderboard<'trixfaction'>>> = []
    let leaderboardPlayer: Awaited<ReturnType<typeof this.api.getLeaderboard<'trixuser'>>> = []

    switch (request.qs().tab ?? 'player') {
      case 'faction':
        leaderboardFaction = await this.api.getLeaderboard('trixfaction')
        break
      case 'player':
        leaderboardPlayer = await this.api.getLeaderboard('trixuser')
        break
    }

    return inertia.render('leaderboard/trixium/index', { leaderboardFaction, leaderboardPlayer })
  }
}
