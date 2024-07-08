import { ApiService } from '#core/services/api'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MinecraftController {
  constructor(private api: ApiService) {}

  async generateToken({ auth, response }: HttpContext) {
    const result = await this.api.generateDiscordTokenLink(auth!.user.id)
    return response.ok(result)
  }

  async unlinkAccount({ auth, response }: HttpContext) {
    await this.api.unlinkMinecraftAccount(auth!.user.id)
    return response.noContent()
  }
}
