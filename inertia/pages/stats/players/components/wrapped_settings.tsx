import { DndContext, DragEndEvent } from '@dnd-kit/core'
import type { Infer } from '@vinejs/vine/types'
import * as React from 'react'

import type { playerWrappedValidator } from '#stats/validators/player_validator'
import { ProfileBanner } from '~/types'
import { getRandomMetricIds } from './wrapped_metrics'

type WrappedSettingsContextValue = {
  player: Infer<typeof playerWrappedValidator>
  banner: ProfileBanner | 'none'
  slots: Record<string, string>
  changeBanner: (banner: ProfileBanner | 'none') => void
  changeSlot: (slot: string, metric: string) => void
}

const WrappedSettingsContext = React.createContext<WrappedSettingsContextValue>(
  {} as WrappedSettingsContextValue
)

const WrappedSettings = ({
  children,
  player,
}: {
  children: React.ReactNode
  player: WrappedSettingsContextValue['player']
}) => {
  const [banner, setBanner] = React.useState<WrappedSettingsContextValue['banner']>('shore')

  const [slots, setSlots] = React.useState<WrappedSettingsContextValue['slots']>(() => {
    const ids = getRandomMetricIds(6, (metric) => metric.isVisible(player))
    return {
      'slot-1': ids[0],
      'slot-2': ids[1],
      'slot-3': ids[2],
      'slot-4': ids[3],
      'slot-5': ids[4],
      'slot-6': ids[5],
    }
  })

  const changeSlot = React.useCallback((slot: string, metric: string) => {
    setSlots((prev) => ({
      ...prev,
      [slot]: metric,
    }))
  }, [])

  const onDragEnd = (event: DragEndEvent) => {
    if (!event.over || !event.active.data.current?.type) {
      return
    }

    changeSlot(String(event.over.id), event.active.data.current.type)
  }

  return (
    <WrappedSettingsContext.Provider
      value={{ player, banner, slots, changeBanner: setBanner, changeSlot }}
    >
      <DndContext onDragEnd={onDragEnd}>{children}</DndContext>
    </WrappedSettingsContext.Provider>
  )
}

const useWrappedSettings = () => {
  const context = React.useContext(WrappedSettingsContext)

  if (!context) {
    throw new Error('useWrappedSettings should be used within <WrappedSettings>')
  }

  return context
}

export { useWrappedSettings, WrappedSettings }
