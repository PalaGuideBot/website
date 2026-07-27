import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

import StaffMiddleware from '#app/middleware/staff_middleware'
import { type DiscordUser } from '#app/types'
import { discordUserValidator } from '#staff/validators/discord_user_validator'

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

    if (user) {
      const staff = user.roles.some((role) => role.name === StaffMiddleware.ROLE_NAME)

      if ('inertia' in ctx) {
        ctx.inertia.share({ auth: user })
        staff && ctx.inertia.share({ staff })
      }

      ctx.auth = { user, staff }
    }

    return next()
  }
}

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    auth?: {
      user: DiscordUser
      staff: boolean
    }
  }
}
