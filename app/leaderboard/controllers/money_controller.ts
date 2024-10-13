import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { getCurrentSeason } from '#core/content/paladium'
import { ApiService } from '#core/services/api'
import { distanceValidator } from '#core/validators/filter_validator'

@inject()
export default class MoneyController {
  constructor(private api: ApiService) {}

  async index({ inertia, request }: HttpContext) {
    const currentSeason = getCurrentSeason()
    const options = await distanceValidator.validate(request.qs(), {
      meta: {
        from: currentSeason.start.toSQLDate()!,
        to: currentSeason.end.toSQLDate(),
      },
    })

    console.log(options)

    const leaderboard = await this.api.getLeaderboard('money', options)
    return inertia.render('leaderboard/money/index', { leaderboard, options })
  }
}
