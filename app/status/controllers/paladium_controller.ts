import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { isToday } from 'date-fns'

@inject()
export default class PaladiumController {
  constructor(private api: ApiService) {}

  async index({ inertia }: HttpContext) {
    const status = await this.api.getPaladiumStatus()
    const todayStatus = status.filter((s) => isToday(s.timestamp))
    return inertia.render('status/paladium/index', { status: todayStatus })
  }
}
