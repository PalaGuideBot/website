import { Exception } from '@adonisjs/core/exceptions'
import { base64 } from '@adonisjs/core/helpers'
import { Renderer, type RenderOptions } from '@takumi-rs/core'
import { promises as fs } from 'node:fs'
import sharp from 'sharp'

export class ImageRenderer {
  static defaultWitdh = 1200
  static defaultHeight = 630

  #renderer: Renderer

  #source: Parameters<Renderer['renderAsync']>[0]

  constructor(source: Parameters<Renderer['renderAsync']>[0]) {
    this.#source = source
    this.#renderer = new Renderer()
  }

  async render(
    options: RenderOptions = {
      width: ImageRenderer.defaultWitdh,
      height: ImageRenderer.defaultHeight,
      format: 'Png',
    }
  ) {
    const output = await this.#renderer.renderAsync(this.#source, options)
    return sharp(output).png()
  }

  async registerFont(path: string) {
    const font = await fs.readFile(path)
    await this.#renderer.loadFontAsync(font)
  }

  static async imageToDataURL(url: string) {
    const response = await fetch(url)
    const mimeType = response.headers.get('content-type') || 'image/png'

    if (!mimeType.startsWith('image/')) {
      throw new Exception('URL does not point to an image')
    }

    const buffer = await response.arrayBuffer()

    return `data:${mimeType};base64,${base64.encode(buffer)}`
  }
}
