import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { container, text } from '@takumi-rs/helpers'
import { readFile } from 'node:fs/promises'

import { baseAppContainer, MUTED_COLOR } from '#core/content/og'
import { ApiService } from '#core/services/api'
import { ImageRenderer } from '#og/services/image_renderer'
import env from '#start/env'

@inject()
export default class PageController {
  constructor(private api: ApiService) {}
  async home({ inertia }: HttpContext) {
    const discordStats = await this.api.getBotStatistics()
    const isActiveGiveaway = await this.api.checkGiveaway()

    return inertia.render('home', { discordStats, isActiveGiveaway })
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

  async know_everything({ request, response, inertia }: HttpContext) {
    const content = await readFile(
      app.makePath('resources/static/pages/know_everything.md'),
      'utf-8'
    )
    switch (request.accepts(['text/markdown', 'text/html'])) {
      case 'text/markdown':
        return response.status(200).header('Content-Type', 'text/markdown').send(content)
      case 'text/html':
      default:
        return inertia.render('know_everything', { content })
    }
  }

  async informations({ inertia }: HttpContext) {
    return inertia.render('informations')
  }

  async faq({ inertia }: HttpContext) {
    return inertia.render('faq')
  }

  async openGraph({ response, request }: HttpContext) {
    const qs = request.qs()

    const title = qs.title || 'PalaGuideBot'
    const description = qs.description || 'Comment ça marche ce truc ?'

    const renderer = new ImageRenderer(
      await baseAppContainer([
        container({
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          },
          children: [
            text(title, {
              fontSize: 64,
            }),
            text(description, {
              fontSize: 42,
              color: MUTED_COLOR,
            }),
          ],
        }),
      ])
    )

    await renderer.registerFont(app.makePath('app/og/fonts/inter-400-normal.woff'))

    const output = await renderer.render()

    return response.header('Content-Type', 'image/png').stream(output)
  }
}
