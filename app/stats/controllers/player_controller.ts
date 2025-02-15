import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

import { getCurrentSeason } from '#core/content/paladium'
import { createPageErrorFromException } from '#core/helpers/error'
import { ApiService } from '#core/services/api'
import { distanceValidator } from '#core/validators/filter_validator'

@inject()
export default class PlayerController {
  constructor(private api: ApiService) {}

  async show({ inertia, response, request, params, auth }: HttpContext) {
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
    return inertia.render('stats/players/show', {
      player,
      examplePlayer,
      options,
    })
  }

  async jobs({ params, response }: HttpContext) {
    const jobs = await this.api.getPlayerJobs(params.username)

    return response.json(jobs)
  }

  async wrapped({ auth, inertia }: HttpContext) {
    let player = null

    try {
      const profile = await this.api.getMinecraftAccountLinked(auth!.user.id)
      player = await this.api.getPlayerWrapped(profile.username)
    } catch {}

    return inertia.render('stats/players/wrapped/index', { player })
  }

  async wrappedEnd({ auth, inertia }: HttpContext) {
    let player = null

    try {
      const profile = await this.api.getMinecraftAccountLinked(auth!.user.id)
      player = await this.api.getPlayerWrapped(profile.username)
    } catch {}

    return inertia.render('stats/players/wrapped/end', { player })
  }
}
