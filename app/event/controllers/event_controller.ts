import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { ApiService } from '#core/services/api'

@inject()
export default class EventController {
  constructor(private api: ApiService) {}

  async index({ inertia }: HttpContext) {
    const factionQuest = await this.api.getEventFactionQuest()
    const factionOnYourMarks = await this.api.getEventFactionOnYourMarks()

    return inertia.render('event/index', { factionQuest, factionOnYourMarks })
  }
}
