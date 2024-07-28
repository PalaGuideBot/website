import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(private api: ApiService) {}

  async show({ inertia, params, auth }: HttpContext) {
    let targetUser = null
    let exampleUser = null
    let authUser = null
    let isLinked = false

    try {
      if (auth?.user && !params.username) {
        const profile = await this.api.getMinecraftAccountLinked(auth.user!.id)
        isLinked = true
        authUser = await this.api.getUser(profile.username)
      }
    } catch {}

    try {
      if (params.username) {
        targetUser = await this.api.getUser(params.username)
      }

      if (!authUser && !params.username) {
        exampleUser = await this.api.getUser('PalaGuideBot')
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Une erreur est survenue'
      inertia.share({ error: message })
    }
    return inertia.render('stats/users/show', { targetUser, exampleUser, authUser, isLinked })
  }
}
