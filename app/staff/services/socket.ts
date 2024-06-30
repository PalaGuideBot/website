import app from '@adonisjs/core/services/app'
import { WebSocket } from 'ws'

let socket: WebSocket

app.booted(async () => {
  socket = await app.container.make('socket')
})

export { socket as default }
