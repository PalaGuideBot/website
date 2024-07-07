import { discordUserValidator } from '#staff/validators/discord_user_validator'
import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  profile({ inertia }: HttpContext) {
    return inertia.render('auth/profile')
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

    const user = await discord.user()

    const validatedUser = await this.#validateUser(user)

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
