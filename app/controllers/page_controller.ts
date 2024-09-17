import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { readFile } from 'node:fs/promises'

import { ApiService } from '#core/services/api'
import env from '#start/env'

@inject()
export default class PageController {
  constructor(private api: ApiService) {}
  async home({ inertia }: HttpContext) {
    const discordStats = await this.api.getBotStatistics()
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

  async changelog({ request, response, inertia }: HttpContext) {
    const content = await readFile(app.makePath('resources/static/pages/changelog.md'), 'utf-8')

    switch (request.accepts(['text/markdown', 'text/html'])) {
      case 'text/markdown':
        return response.status(200).header('Content-Type', 'text/markdown').send(content)
      case 'text/html':
      default:
        return inertia.render('changelog', { content })
    }
  }

  async informations({ inertia }: HttpContext) {
    return inertia.render('informations')
  }

  async faq({ inertia }: HttpContext) {
    return inertia.render('faq')
  }
}
