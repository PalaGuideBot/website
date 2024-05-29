import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class FactionsController {
  constructor(private api: ApiService) {}

  async show({ inertia, params }: HttpContext) {
    let faction = null
    let exampleFaction = null
    try {
      if (params.name) {
        faction = await this.api.getFaction(params.name)
      } else {
        exampleFaction = await this.api.getFaction('RareCrew')
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Une erreur est survenue'
      inertia.share({ error: message })
    }
    return inertia.render('stats/factions/show', { faction, exampleFaction })
  }
}
