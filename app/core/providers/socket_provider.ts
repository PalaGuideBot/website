import type { ApplicationService } from '@adonisjs/core/types'
import { io, Socket } from 'socket.io-client'

import type { ClientToServerEvents, ServerToClientEvents } from '#core/services/socket'
import env from '#start/env'

const MAX_RETRIES = 5
const RETRY_INTERVAL = 5000

export default class SocketProvider {
  private url = env.get('API_URL').replace('http', 'ws')

  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton('socket', () => {
      return io(this.url, {
        reconnectionAttempts: MAX_RETRIES,
        reconnectionDelay: RETRY_INTERVAL,
        extraHeaders: { Authorization: `Bearer ${env.get('API_KEY')}` },
        path: '/ws',
      })
    })
  }

  async boot() {
    const socket = await this.app.container.make('socket')
    const logger = await this.app.container.make('logger')

    socket.io.on('open', () => {
      logger.info(`Socket connection established on ${this.url}`)
    })

    socket.io.on('error', () => {
      logger.error(`Socket connection error on ${this.url}`)
    })

    socket.io.on('reconnect_attempt', () => {
      logger.info(`Retrying to connect to ${this.url}`)
    })

    socket.io.on('reconnect_failed', () => {
      logger.info(`Failed to connect to ${this.url} after ${MAX_RETRIES} attempts`)
    })

    socket.io.on('close', () => {
      logger.info(`Socket connection closed on ${this.url}`)
    })
  }

  async shutdown() {
    const socket = await this.app.container.make('socket')
    socket.disconnect()
    socket.close()
  }
}

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>
  }
}
