import ky from 'ky'
import useSwr from 'swr'

export const useMinecraftItem = (id: string) => {
  const { data, error, isLoading } = useSwr(
    id,
    async (itemId) => {
      const response = await ky.get(
        `https://image.palaguidebot.fr/minecraft/items/${encodeURIComponent(itemId)}/informations`
      )

      return await response.json<{ name: string; url: string }>()
    },
    {
      errorRetryCount: 0,
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    data,
    error,
    isLoading,
  }
}
