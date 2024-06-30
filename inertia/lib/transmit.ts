import { Transmit } from '@adonisjs/transmit-client'

// Make it available only on the client side
const transmit = (() => {
  if (typeof window !== 'undefined') {
    return new Transmit({
      baseUrl: window.location.origin,
    })
  }
})() as Transmit

export { transmit }
