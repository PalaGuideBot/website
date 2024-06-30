import env from '#start/env'
import type { ApplicationService } from '@adonisjs/core/types'
import WebSocket from 'ws'

export default class SocketProvider {
  constructor(protected app: ApplicationService) {}

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
      logger.info(`Socket connection established on ${socket.url}`)
    })

    socket.on('message', (data) => {
      transmit.broadcast('staff/ws', JSON.parse(data.toString()))
    })

    socket.on('close', () => {
      logger.info(`Socket connection closed on ${socket.url}`)
    })
  }

  async shutdown() {
    const socket = await this.app.container.make('socket')
    socket.close()
  }
}

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    socket: WebSocket
  }
}
