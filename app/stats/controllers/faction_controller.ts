import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

import { createPageErrorFromException } from '#core/helpers/error'
import { ApiService } from '#core/services/api'

@inject()
export default class FactionController {
  constructor(private api: ApiService) {}

  async show({ inertia, params }: HttpContext) {
    let faction = null
    let exampleFaction = null
    try {
      if (params.name) {
        faction = await this.api.getFaction(params.name)
      } else {
        exampleFaction = await this.api.getFaction('GuideBot')
      }
    } catch (error: unknown) {
      if (error instanceof Exception) {
        inertia.share({ error: createPageErrorFromException(error) })
      }
    }
    return inertia.render('stats/factions/show', { faction, exampleFaction })
  }
}
