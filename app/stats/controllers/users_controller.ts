import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(private api: ApiService) {}

  async show({ inertia, params }: HttpContext) {
    let user = null
    let exampleUser = null
    try {
      if (params.username) {
        user = await this.api.getUser(params.username)
      } else {
        exampleUser = await this.api.getUser('PalaGuideBot')
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Une erreur est survenue'
      inertia.share({ error: message })
    }
    return inertia.render('stats/users/show', { user, exampleUser })
  }
}
