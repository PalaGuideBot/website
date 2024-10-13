import { getCurrentSeason } from '#core/content/paladium'
import { ApiService } from '#core/services/api'
import { distanceValidator } from '#core/validators/filter_validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class BossController {
  constructor(private api: ApiService) {}

  async index({ inertia, request }: HttpContext) {
    const currentSeason = getCurrentSeason()
    const options = await distanceValidator.validate(request.qs(), {
      meta: {
        from: currentSeason.start.toSQLDate()!,
        to: currentSeason.end.toSQLDate(),
      },
    })

    const leaderboard = await this.api.getLeaderboard('boss', options)
    return inertia.render('leaderboard/boss/index', { leaderboard, options })
  }
}
