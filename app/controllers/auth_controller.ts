import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

import { ApiService } from '#core/services/api'
import { discordUserValidator } from '#staff/validators/discord_user_validator'

@inject()
export default class AuthController {
  constructor(private api: ApiService) {}

  async profile({ inertia, auth }: HttpContext) {
    let minecraftAccount = null
    try {
      minecraftAccount = await this.api.getMinecraftAccountLinked(auth!.user.id)
    } catch {}

    return inertia.render('auth/profile', { minecraftAccount })
  }

  login({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  logout({ session, response }: HttpContext) {
    session.clear()
    session.regenerate()

    return response.redirect().toRoute('home')
  }

  async redirect({ ally }: HttpContext) {
    return ally.use('discord').redirect()
  }

  async callback({ ally, session, response }: HttpContext) {
    const discord = ally.use('discord')

    if (discord.accessDenied()) {
      throw new Exception("Vous n'avez pas le droit d'accéder à cette application Discord", {
        status: 403,
      })
    }

    if (discord.stateMisMatch()) {
      throw new Exception("Nous n'avons pas pu vérifier votre requête. Veuillez réessayer", {
        status: 400,
      })
    }

    if (discord.hasError()) {
      throw new Exception(discord.getError() ?? 'Erreur provenant de Discord', { status: 400 })
    }

    const discordUser = await discord.user()

    const validatedDiscordUser = await this.#validateUser(discordUser)

    let user = await this.api.getUser(validatedDiscordUser.id)

    if (!user) {
      user = await this.api.createUser(validatedDiscordUser.id)
    }

    session.put('user', { ...validatedDiscordUser, roles: user.roles })
    session.regenerate()

    return response.redirect().toRoute('home')
  }

  async #validateUser(data: any) {
    try {
      return discordUserValidator.validate({
        ...data,
        globalName: data.original.global_name ?? data.user.nickName,
      })
    } catch (error: unknown) {
      throw new Exception('Invalid user data received from Discord', {
        status: 422,
        code: 'E_INVALID_DISCORD_USER',
        cause: error,
      })
    }
  }
}
