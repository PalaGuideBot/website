import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { isToday, isBefore, addDays, startOfDay } from 'date-fns'

@inject()
export default class PaladiumController {
  constructor(private api: ApiService) {}

  async index({ inertia }: HttpContext) {
    const status = await this.api.getPaladiumStatus()
    const todayStatus = status.filter((s) => isToday(s.date))
    const last30daysStatus = status.filter((s) =>
      isBefore(s.date, addDays(startOfDay(new Date()), 30))
    )
    return inertia.render('status/paladium/index', { todayStatus, last30daysStatus })
  }
}
