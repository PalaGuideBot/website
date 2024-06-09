import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class HomeController {
  constructor(private api: ApiService) {}
  async index({ inertia }: HttpContext) {
    const discordStats = await this.api.getDiscordStatistics()
    return inertia.render('home', { discordStats })
  }
}
