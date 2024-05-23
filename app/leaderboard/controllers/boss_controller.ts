import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class BossController {
  constructor(private api: ApiService) {}
  async index({ inertia }: HttpContext) {
    const leaderboard = await this.api.getLeaderboard('boss')
    return inertia.render('leaderboard/boss/index', { leaderboard })
  }
}
