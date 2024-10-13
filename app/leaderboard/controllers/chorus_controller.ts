import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { getCurrentSeason } from '#core/content/paladium'
import { ApiService } from '#core/services/api'
import { distanceValidator } from '#core/validators/filter_validator'

@inject()
export default class ChorusController {
  constructor(private api: ApiService) {}

  async index({ inertia, request }: HttpContext) {
    const currentSeason = getCurrentSeason()
    const options = await distanceValidator.validate(request.qs(), {
      meta: {
        from: currentSeason.start.toSQLDate()!,
        to: currentSeason.end.toSQLDate(),
      },
    })

    const leaderboard = await this.api.getLeaderboard('chorus', options)
    return inertia.render('leaderboard/chorus/index', { leaderboard, options })
  }
}
