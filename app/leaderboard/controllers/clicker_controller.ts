import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ClickerController {
  constructor(private api: ApiService) {}
  async index({ inertia }: HttpContext) {
    const leaderboard = await this.api.getLeaderboard('clicker')
    return inertia.render('leaderboard/clicker/index', { leaderboard })
  }
}
