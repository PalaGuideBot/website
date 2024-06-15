import type { DiscordUser } from '#app/types'
import { usePage } from '@inertiajs/react'

export const useAuth = () => {
  const {
    props: { auth },
  } = usePage<{ auth?: DiscordUser }>()

  return auth
}
