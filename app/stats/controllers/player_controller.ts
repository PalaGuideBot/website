import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PlayerController {
  constructor(private api: ApiService) {}

  async show({ inertia, params, auth }: HttpContext) {
    let targetPlayer = null
    let examplePlayer = null
    let authPlayer = null
    let isLinked = false

    try {
      if (auth?.user && !params.username) {
        const profile = await this.api.getMinecraftAccountLinked(auth.user!.id)
        isLinked = true
        authPlayer = await this.api.getPlayer(profile.username)
      }
    } catch {}

    try {
      if (params.username) {
        targetPlayer = await this.api.getPlayer(params.username)
      }

      if (!authPlayer && !params.username) {
        examplePlayer = await this.api.getPlayer('PalaGuideBot')
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Une erreur est survenue'
      inertia.share({ error: message })
    }
    return inertia.render('stats/players/show', {
      targetPlayer,
      examplePlayer,
      authPlayer,
      isLinked,
    })
  }
}
