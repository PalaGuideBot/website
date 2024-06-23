import { ApiService } from '#core/services/api'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { readFile } from 'node:fs/promises'

@inject()
export default class PageController {
  constructor(private api: ApiService) {}
  async home({ inertia }: HttpContext) {
    const discordStats = await this.api.getDiscordStatistics()
    return inertia.render('home', { discordStats })
  }

  async discord({ response }: HttpContext) {
    const url = env.get('DISCORD_INVITE_URL')

    if (!url) {
      return response.redirect().toRoute('home')
    }

    return response.redirect(url)
  }

  async privacy({ inertia }: HttpContext) {
    const content = await readFile(app.makePath('resources/static/pages/privacy.md'), 'utf-8')
    return inertia.render('privacy', { content })
  }

  async terms({ inertia }: HttpContext) {
    const content = await readFile(app.makePath('resources/static/pages/terms.md'), 'utf-8')
    return inertia.render('terms', { content })
  }

  async changelogs({ inertia }: HttpContext) {
    const content = await readFile(app.makePath('resources/static/pages/changelogs.md'), 'utf-8')
    return inertia.render('changelogs', { content })
  }

  async informations({ inertia }: HttpContext) {
    return inertia.render('informations')
  }
}
