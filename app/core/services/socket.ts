import app from '@adonisjs/core/services/app'
import { Socket } from 'socket.io-client'

interface ServerToClientEvents {
  'usage:metrics': (data: any[]) => void
}

interface ClientToServerEvents {}

let socket: Socket<ClientToServerEvents, ClientToServerEvents>

app.booted(async () => {
  socket = await app.container.make('socket')
})

export { socket as default }
export type { ClientToServerEvents, ServerToClientEvents }
