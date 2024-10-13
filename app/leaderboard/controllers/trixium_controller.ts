import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { Infer } from '@vinejs/vine/types'

import { getCurrentSeason } from '#core/content/paladium'
import { ApiService } from '#core/services/api'
import { distanceValidator } from '#core/validators/filter_validator'
import { trixiumValidators } from '#leaderboard/validators/leaderboard_validator'

type LeaderboardFaction = Infer<(typeof trixiumValidators)['faction']>
type LeaderboardPlayer = Infer<(typeof trixiumValidators)['player']>

@inject()
export default class TrixiumController {
  constructor(private api: ApiService) {}

  async index({ inertia, request }: HttpContext) {
    const currentSeason = getCurrentSeason()
    const options = await distanceValidator.validate(request.qs(), {
      meta: {
        from: currentSeason.start.toSQLDate()!,
        to: currentSeason.end.toSQLDate(),
      },
    })

    let leaderboardFaction: LeaderboardFaction = []
    let leaderboardPlayer: LeaderboardPlayer = []

    switch (request.qs().tab ?? 'player') {
      case 'faction':
        leaderboardFaction = await this.api.getLeaderboardTrixium('faction', options)
        break
      case 'player':
        leaderboardPlayer = await this.api.getLeaderboardTrixium('player', options)
        break
    }

    return inertia.render('leaderboard/trixium/index', {
      leaderboardFaction,
      leaderboardPlayer,
      options,
    })
  }
}
