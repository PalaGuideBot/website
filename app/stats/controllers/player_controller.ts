import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { type PageObject } from '@adonisjs/inertia/types'

import { getCurrentSeason } from '#core/content/paladium'
import { createPageErrorFromException } from '#core/helpers/error'
import { ApiService } from '#core/services/api'
import { DistanceFilter, distanceValidator } from '#core/validators/filter_validator'

@inject()
export default class PlayerController {
  constructor(private api: ApiService) {}

  async show({ inertia, response, request, params, auth }: HttpContext): Promise<
    | string
    | PageObject<{
        player: Awaited<ReturnType<ApiService['getPlayer']>> | null
        examplePlayer: Awaited<ReturnType<ApiService['getPlayer']>> | null
        options: DistanceFilter
      }>
  > {
    let player = null
    let examplePlayer = null

    const currentSeason = getCurrentSeason()
    const options = await distanceValidator.validate(request.qs(), {
      meta: {
        from: currentSeason.start.toSQLDate()!,
        to: currentSeason.end.toSQLDate(),
      },
    })

    try {
      if (auth?.user && !params.username) {
        const profile = await this.api.getMinecraftAccountLinked(auth.user!.id)
        //@ts-ignore
        return response.redirect(`/players/${profile.username}`)
      }
    } catch {}

    try {
      if (params.username) {
        player = await this.api.getPlayer(params.username, options)
      } else {
        examplePlayer = await this.api.getPlayer('PalaGuideBot', options)
      }
    } catch (error: unknown) {
      if (error instanceof Exception) {
        inertia.share({
          error: createPageErrorFromException(error),
        })
      }
    }
    console.log(player)
    return inertia.render('stats/players/show', {
      player,
      examplePlayer,
      options,
    })
  }
}
