import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { setTimeout } from 'node:timers/promises'

import { ApiService } from '#core/services/api'
import { Exception } from '@adonisjs/core/exceptions'

@inject()
export default class GiveawayController {
  constructor(private api: ApiService) {}

  async index({ inertia, auth }: HttpContext) {
    const discordId = auth?.user.id

    const giveaway = await this.api.getActiveGiveaway()
    const state =
      giveaway && discordId
        ? await this.api.getUserGiveawayState(giveaway._id, discordId)
        : { participated: false, linked: false }

    return inertia.render('event/giveaway', {
      giveaway: giveaway
        ? {
            ...giveaway,
            participants: giveaway?.participants.map((participant) => ({
              avatarUrl: participant.avatarUrl,
            })),
            winners: giveaway?.winners.map(({ roles, ...winner }) => winner),
          }
        : null,
      state,
    })
  }

  async participate({ response, auth }: HttpContext) {
    const discordId = auth!.user.id

    const giveaway = await this.api.getActiveGiveaway()

    if (!giveaway) {
      throw new Exception('No active giveaway found', { status: 404 })
    }

    await this.api.participateGiveaway(giveaway._id, discordId)

    await setTimeout(1000)

    return response.redirect().back()
  }
}
