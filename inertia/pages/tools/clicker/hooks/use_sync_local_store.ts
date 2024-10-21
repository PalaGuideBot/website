import { router } from '@inertiajs/react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useIsClient } from 'usehooks-ts'

import type { PlayerClickerData } from '#tools/types'
import { usePlayerClickerStore } from '../stores/player_clicker_store'

export function useSyncLocalStore(clicker: PlayerClickerData | null) {
  const isClient = useIsClient()
  const playerClickerStore = usePlayerClickerStore()

  useEffect(() => {
    // If the local data is present and the clicker is different, we reinitialize the store
    if (playerClickerStore.data && clicker && playerClickerStore.data.uuid !== clicker.uuid) {
      playerClickerStore.init(clicker)
    }
  }, [clicker, playerClickerStore.data])

  useEffect(() => {
    // If the clicker is present and the store is not initialized, we initialize it
    if (isClient && !playerClickerStore.data && clicker) {
      playerClickerStore.init(clicker)
    }
  }, [isClient, clicker, playerClickerStore.data])

  useEffect(() => {
    // If the clicker is not present and the store is initialized, we navigate to right player
    if (!clicker && playerClickerStore.data) {
      router.visit(`/tools/clicker/${playerClickerStore.data.username}`, { replace: true })
    }
  }, [clicker, playerClickerStore.data])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      switch (clicker?.state) {
        case 'NOT_FOUND':
          toast.error("Les informations de ce joueur n'ont pas été trouvées.")
          break
        case 'UNAUTHORIZED':
          toast.error('Ce joueur a masqué ses informations sur le clicker.')
          break
        case 'UNKNOWN_ERROR':
          toast.error(
            'Une erreur inconnue est survenue, les informations ne sont donc pas disponibles.'
          )
          break
      }
    })

    return () => {
      clearTimeout(timeoutId)
    }
  }, [clicker?.state])
}
