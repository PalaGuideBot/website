import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { ApiService } from '#core/services/api'

@inject()
export default class ClickerController {
  constructor(private api: ApiService) {}

  async show({ params, inertia }: HttpContext) {
    let clicker = null

    if (params.username) {
      try {
        clicker = await this.api.getPlayerClickerData(params.username)
      } catch {}
    }

    const upgrades = await this.api.getClickerUpgrades()

    return inertia.render('tools/clicker/show', { clicker, upgrades })
  }
}
