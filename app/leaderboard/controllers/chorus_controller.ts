import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { ApiService } from '#core/services/api'
import { distanceValidator } from '#core/validators/filter_validator'
import type { ClientSeasonsFromProps } from '#app/types'

@inject()
export default class ChorusController {
  constructor(private api: ApiService) {}

  async index({ inertia, request }: HttpContext) {
    const seasons = await this.api.getPaladiumSeasons()
    const currentSeason = seasons.seasons[seasons.current]

    const options = await distanceValidator.validate(request.qs(), {
      meta: {
        from: currentSeason.start.toSQLDate()!,
        to: currentSeason.end.toSQLDate(),
      },
    })

    const leaderboard = await this.api.getLeaderboard('chorus', options)
    return inertia.render('leaderboard/chorus/index', {
      leaderboard,
      options,
      seasons: seasons.seasons as unknown as ClientSeasonsFromProps,
    })
  }
}
