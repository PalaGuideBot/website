import { discordUserValidator } from '#staff/validators/discord_user_validator'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Guest middleware is used to deny access to routes that should
 * be accessed by unauthenticated users.
 *
 * For example, the login page should not be accessible if the user
 * is already logged-in
 */
export default class GuestMiddleware {
  /**
   * The URL to redirect to when user is logged-in
   */
  redirectTo = '/staff'

  async handle(ctx: HttpContext, next: NextFn) {
    try {
      await discordUserValidator.validate(ctx.session.get('user'))
      return ctx.response.redirect(this.redirectTo)
    } catch {}

    return next()
  }
}
