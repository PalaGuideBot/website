import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { ApiService } from '#core/services/api'

@inject()
export default class ClickerController {
  constructor(private api: ApiService) {}

  async show({ params, inertia }: HttpContext) {
    let clicker = null
    if (params.username) {
      clicker = await this.api.getPlayerClickerData(params.username)
    }

    const upgrades = await this.api.getClickerUpgrades()

    return inertia.render('tools/clicker/show', {
      clicker,
      upgrades: {
        ...upgrades,
        // SUMMER RUSH BOOST
        clicks: upgrades.clicks.map((click) => ({
          ...click,
          rate: click.rate * (300 / 100),
        })),
      },
    })
  }
}
