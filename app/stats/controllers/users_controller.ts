import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(private api: ApiService) {}

  async show({ inertia, params }: HttpContext) {
    let user
    if (params.username) {
      user = await this.api.getUser(params.username)
    }
    return inertia.render('stats/users/show', { user })
  }
}
