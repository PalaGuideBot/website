import env from '#start/env'
import type { ApplicationService } from '@adonisjs/core/types'
import WebSocket from 'ws'

const MAX_RETRIES = 5

const RETRY_INTERVAL = 5000

export default class SocketProvider {
  constructor(protected app: ApplicationService) {}

  #retries = 0

  register() {
    this.app.container.singleton('socket', () => {
      return new WebSocket(new URL('staff/ws', env.get('API_URL').replace('http', 'ws')), {
        headers: { Authorization: env.get('API_KEY') },
      })
    })
  }

  async boot() {
    const socket = await this.app.container.make('socket')
    const logger = await this.app.container.make('logger')
    const transmit = await this.app.container.make('transmit')

    socket.on('open', () => {
      this.#retries = 0
      logger.info(`Socket connection established on ${socket.url}`)
    })

    socket.on('message', (data) => {
      transmit.broadcast('staff/ws', JSON.parse(data.toString()))
    })

    socket.on('error', () => {
      logger.error(`Socket connection error on ${socket.url}`)
    })

    socket.on('close', () => {
      logger.info(`Socket connection closed on ${socket.url}`)
      this.#retryToConnect()
    })
  }

  async shutdown() {
    const socket = await this.app.container.make('socket')
    socket.close()
  }

  async #retryToConnect() {
    const socket = await this.app.container.make('socket')
    const logger = await this.app.container.make('logger')

    if (socket.readyState === WebSocket.CONNECTING) {
      return
    }

    if (this.#retries >= MAX_RETRIES) {
      logger.info(`Failed to connect to ${socket.url} after ${MAX_RETRIES} retries`)
      return
    }

    if (socket.readyState === WebSocket.CLOSED) {
      logger.info(`Retrying to connect to ${socket.url}`)
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL))
      this.register()
      await this.boot()

      this.#retries++
    }
  }
}

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    socket: WebSocket
  }
}
