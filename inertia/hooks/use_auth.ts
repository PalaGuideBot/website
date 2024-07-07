import type { DiscordUser } from '#app/types'
import { usePage } from '@inertiajs/react'

export const useAuth = () => {
  const {
    props: { auth, staff = false },
  } = usePage<{ auth?: DiscordUser; staff?: boolean }>()

  return auth ? { ...auth, staff } : undefined
}
