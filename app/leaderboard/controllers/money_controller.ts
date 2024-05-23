import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MoneyController {
  constructor(private api: ApiService) {}
  async index({ inertia }: HttpContext) {
    const leaderboard = await this.api.getLeaderboard('money')
    return inertia.render('leaderboard/money/index', { leaderboard })
  }
}
