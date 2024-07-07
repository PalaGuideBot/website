import { DiscordUser } from '#app/types'
import { discordUserValidator } from '#staff/validators/discord_user_validator'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import DiscordIdMiddleware from './discord_id_middleware.js'

/**
 * Silent Auth middleware is used check if a user is authenticated
 * and share the user data.
 */
export default class SilentAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    let user: DiscordUser | null = null

    try {
      user = await discordUserValidator.validate(ctx.session.get('user'))
    } catch {}

    if ('inertia' in ctx && user) {
      ctx.inertia.share({ auth: user })

      if (DiscordIdMiddleware.ids.includes(user.id)) {
        ctx.inertia.share({ staff: true })
      }
    }

    return next()
  }
}
