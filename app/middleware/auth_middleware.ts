import { DiscordUser } from '#app/types'
import { discordUserValidator } from '#staff/validators/discord_user_validator'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/staff/login'

  async handle(ctx: HttpContext, next: NextFn) {
    let user: DiscordUser | null = null

    try {
      user = await discordUserValidator.validate(ctx.session.get('user'))
    } catch {
      return ctx.response.redirect(this.redirectTo)
    }

    if ('inertia' in ctx && user) {
      ctx.inertia.share({ auth: user })
    }

    return next()
  }
}
