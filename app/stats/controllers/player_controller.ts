import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

import { ClientSeasonsFromProps } from '#app/types'
import { createPageErrorFromException } from '#core/helpers/error'
import { ApiService } from '#core/services/api'
import { distanceValidator } from '#core/validators/filter_validator'
import { ImageRenderer } from '#og/services/image_renderer'
import { createOgPlayerContainer } from '#stats/content/og'
import { playerSearchQueryValidator } from '#stats/validators/player_validator'

@inject()
export default class PlayerController {
  constructor(private api: ApiService) {}

  async show({ inertia, response, request, params, auth }: HttpContext) {
    let player = null
    let examplePlayer = null

    const seasons = await this.api.getPaladiumSeasons()
    const currentSeason = seasons.seasons[seasons.current]

    const options = await distanceValidator.validate(request.qs(), {
      meta: {
        from: currentSeason.start.toSQLDate(),
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

    const aureliancnx = params.username?.toLowerCase() === 'aureliancnx'

    return inertia.render('stats/players/show', {
      player,
      examplePlayer,
      options,
      seasons: seasons.seasons as unknown as ClientSeasonsFromProps,
      aureliancnx,
    })
  }

  async jobs({ params, response }: HttpContext) {
    const jobs = await this.api.getPlayerJobs(params.username)

    return response.json(jobs)
  }

  async wrapped({ inertia, params }: HttpContext) {
    let player = null

    if (params.username) {
      player = await this.api.getPlayerWrapped(params.username)
    }

    return inertia.render('stats/players/wrapped/index', { player })
  }

  async wrappedEnd({ inertia, params }: HttpContext) {
    const player = await this.api.getPlayerWrapped(params.username)

    return inertia.render('stats/players/wrapped/end', { player })
  }

  async openGraph({ response, params }: HttpContext) {
    const player = await this.api.getPlayer(params.username)

    try {
      const renderer = new ImageRenderer(await createOgPlayerContainer(player))

      await renderer.registerFont(app.makePath('app/og/fonts/inter-400-normal.woff'))

      return response.header('Content-Type', 'image/png').stream(await renderer.render())
    } catch {
      return response.notFound()
    }
  }

  async search({ response, request }: HttpContext) {
    const { q: query } = await request.validateUsing(playerSearchQueryValidator)

    const results = await this.api.searchPlayers(query)

    return response.ok(results)
  }
}
