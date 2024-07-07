import { ApiService } from '#core/services/api'
import { discordUserValidator } from '#staff/validators/discord_user_validator'
import { inject } from '@adonisjs/core'
import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthController {
  constructor(private api: ApiService) {}

  login({ inertia }: HttpContext) {
    return inertia.render('login')
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

    const user = await discord.user()

    const validatedUser = await this.#validateUser(user)

    try {
      await this.api.checkDiscordAccountLinked(validatedUser.id)
    } catch (error: unknown) {
      if (error instanceof Exception && error.code === 'E_DISCORD_ACCOUNT_LINK_INVALID') {
        return response.redirect().toRoute('auth.login', [], { qs: { code: error.code } })
      }

      throw error
    }

    session.put('user', validatedUser)
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
