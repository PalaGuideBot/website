import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { Infer } from '@vinejs/vine/types'

import { ApiService } from '#core/services/api'
import { trixiumValidators } from '#leaderboard/validators/leaderboard_validator'

type LeaderboardFaction = Infer<(typeof trixiumValidators)['faction']>
type LeaderboardPlayer = Infer<(typeof trixiumValidators)['player']>

@inject()
export default class TrixiumController {
  constructor(private api: ApiService) {}
  async index({ inertia, request }: HttpContext) {
    let leaderboardFaction: LeaderboardFaction = []
    let leaderboardPlayer: LeaderboardPlayer = []

    switch (request.qs().tab ?? 'player') {
      case 'faction':
        leaderboardFaction = await this.api.getLeaderboardTrixium('faction')
        break
      case 'player':
        leaderboardPlayer = await this.api.getLeaderboardTrixium('player')
        break
    }

    return inertia.render('leaderboard/trixium/index', { leaderboardFaction, leaderboardPlayer })
  }
}
