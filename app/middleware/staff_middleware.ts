import { type DiscordUser } from '#app/types'
import { discordUserValidator } from '#staff/validators/discord_user_validator'
import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Discord ID middleware is used authenticate HTTP requests and deny
 * access to unauthorized users.
 */
export default class StaffMiddleware {
  /**
   * IDs of the authorized users
   */
  static ROLE_NAME = 'STAFF'

  async handle(ctx: HttpContext, next: NextFn) {
    let user: DiscordUser | null = null

    try {
      user = await discordUserValidator.validate(ctx.session.get('user'))
    } catch {}

    if (!user || !user.roles.some((role) => role.name === StaffMiddleware.ROLE_NAME)) {
      throw new Exception('Accès réservé au staff', { status: 403 })
    }

    return next()
  }
}
