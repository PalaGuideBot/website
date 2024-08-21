import { DiscordUser } from '#app/types'
import { discordUserValidator } from '#staff/validators/discord_user_validator'
import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Discord ID middleware is used authenticate HTTP requests and deny
 * access to unauthorized users.
 */
export default class DiscordIdMiddleware {
  /**
   * IDs of the authorized users
   */
  static ids = [
    '339809990527156224',
    '363402633752477696',
    '564715397023137793',
    '535585192107048960',
    '512045813191409681',
    '1011962232587960421',
  ]

  async handle(ctx: HttpContext, next: NextFn) {
    let user: DiscordUser | null = null

    try {
      user = await discordUserValidator.validate(ctx.session.get('user'))
    } catch {}

    if (!user || !DiscordIdMiddleware.ids.includes(user.id)) {
      throw new Exception('Accès réservé au staff', { status: 403 })
    }

    return next()
  }
}
