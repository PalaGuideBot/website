import app from '@adonisjs/core/services/app'

app.booted(async () => {
  const socket = await app.container.make('socket')
  const transmit = await app.container.make('transmit')

  socket.on('usage:metrics', (data) => {
    transmit.broadcast('usage/ws', data)
  })
})
