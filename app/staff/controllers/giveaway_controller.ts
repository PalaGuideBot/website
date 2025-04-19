import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

import { ApiService } from '#core/services/api'
import {
  createGiveawayValidator,
  drawGiveawayValidator,
  updateGiveawayValidator,
} from '#event/validators/giveaway_validator'

@inject()
export default class GiveawayController {
  constructor(private api: ApiService) {}

  async index({ inertia }: HttpContext) {
    const giveaways = await this.api.getGiveaways()

    return inertia.render('staff/giveaways/index', { giveaways })
  }

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createGiveawayValidator)
    await this.api.createGiveaway(payload)

    return response.redirect().back()
  }

  async update({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(updateGiveawayValidator)
    await this.api.updateGiveaway(params.id, payload)

    return response.redirect().back()
  }

  async destroy({ response, params }: HttpContext) {
    await this.api.deleteGiveaway(params.id)

    return response.redirect().back()
  }

  async draw({ response, request, params }: HttpContext) {
    const payload = await request.validateUsing(drawGiveawayValidator)

    try {
      await this.api.drawGiveaway(params.id, payload.count)
      return response.ok({ message: 'Les gagnants ont été tirés au sort !' })
    } catch (error: unknown) {
      const message = error instanceof Exception ? error.message : 'Une erreur est survenue.'
      return response.badRequest({ message })
    }
  }

  async deleteParticipant({ response, params }: HttpContext) {
    await this.api.deleteGiveawayParticipant(params.id, params.participantId)

    return response.redirect().back()
  }
}
