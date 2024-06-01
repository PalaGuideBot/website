import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PaladiumController {
  constructor(private api: ApiService) {}

  async index({ inertia }: HttpContext) {
    const status = await this.api.getPaladiumStatus()
    return inertia.render('status/paladium/index', { status })
  }
}
