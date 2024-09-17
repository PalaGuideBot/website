import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { type PageObject } from '@adonisjs/inertia/types'

import { createPageErrorFromException } from '#core/helpers/error'
import { ApiService } from '#core/services/api'

@inject()
export default class PlayerController {
  constructor(private api: ApiService) {}

  async show({ inertia, response, params, auth }: HttpContext): Promise<
    | string
    | PageObject<{
        player: Awaited<ReturnType<ApiService['getPlayer']>> | null
        examplePlayer: Awaited<ReturnType<ApiService['getPlayer']>> | null
      }>
  > {
    let player = null
    let examplePlayer = null

    try {
      if (auth?.user && !params.username) {
        const profile = await this.api.getMinecraftAccountLinked(auth.user!.id)
        //@ts-ignore
        return response.redirect(`/players/${profile.username}`)
      }
    } catch {}

    try {
      if (params.username) {
        player = await this.api.getPlayer(params.username)
      } else {
        examplePlayer = await this.api.getPlayer('PalaGuideBot')
      }
    } catch (error: unknown) {
      if (error instanceof Exception) {
        inertia.share({
          error: createPageErrorFromException(error),
        })
      }
    }
    return inertia.render('stats/players/show', {
      player,
      examplePlayer,
    })
  }
}
