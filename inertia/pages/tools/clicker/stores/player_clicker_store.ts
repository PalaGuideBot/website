import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { ClickerClickUpgrade, PlayerClickerData } from '#tools/types'
import { CLICKER_OPTIONS, ClickerCalculator } from '~/lib/clicker'

type State = {
  data: PlayerClickerData | null
}

type Actions = {
  init: (data: PlayerClickerData) => void
  hasUpgrade(upgrade: string): boolean
  toggleUpgrade(upgrade: string): void
  unlockClick(name: string, clicks: ClickerClickUpgrade[]): void
  updateJobLevel(job: keyof PlayerClickerData['jobs'], level: number): void
  adjustBuildingQuantity(building: string, adjustement: number): void
  setBuildingQuantity(building: string, quantity: number): void
  getRps(calculator: ClickerCalculator): number
  getTotalProduction(): number
}

const storageKey = 'player_clicker_data'

const initialState: State = {
  data: null,
}

export const usePlayerClickerStore = create(
  persist<State & Actions>(
    (set, get) => ({
      ...initialState,
      init(data) {
        if (get().data) {
          set({ data: null })
        }
        set({ data: { ...data } })
      },
      hasUpgrade(upgrade) {
        return get().data?.upgrades.includes(upgrade) ?? false
      },
      toggleUpgrade(upgrade) {
        const data = get().data

        if (!data) {
          return
        }

        if (data.upgrades.includes(upgrade)) {
          data.upgrades = data.upgrades.filter((u) => u !== upgrade)
        } else {
          data.upgrades = [...data.upgrades, upgrade]
        }

        set({ data: { ...data, upgrades: [...data.upgrades] } })
      },
      unlockClick(click, clicks) {
        const data = get().data

        if (!data) {
          return
        }

        const clickIndex = clicks.findIndex((c) => c.name === click)

        if (clickIndex === -1) {
          return
        }

        const lastPlayerClick = data.upgrades
          .filter((upgrade) => clicks.some((c) => c.name === upgrade))
          .toSorted(
            (a, b) => clicks.findIndex((c) => c.name === a) - clicks.findIndex((c) => c.name === b)
          )
          .at(-1)

        const unlockedClicks = clicks.slice(0, clickIndex + 1).map((c) => c.name)

        data.upgrades = Array.from(
          new Set([
            ...data.upgrades.filter((u) => !clicks.some((c) => c.name === u)),
            ...(lastPlayerClick !== click ? unlockedClicks : []),
          ])
        )

        set({ data: { ...data } })
      },
      updateJobLevel(job, level) {
        const data = get().data

        if (!data) {
          return
        }

        data.jobs[job].level = level

        set({ data: { ...data } })
      },
      adjustBuildingQuantity(building, adjustment) {
        const data = get().data

        if (!data) {
          return
        }

        const target = data.buildings.find((b) => b.name === building)

        if (!target) {
          return
        }

        if (
          target.quantity + adjustment < CLICKER_OPTIONS.MIN_BUILDING_QUANTITY ||
          target.quantity + adjustment > CLICKER_OPTIONS.MAX_BUILDING_QUANTITY
        ) {
          return
        }

        target.quantity += adjustment

        set({ data: { ...data } })
      },
      setBuildingQuantity(building, quantity) {
        const data = get().data

        if (!data) {
          return
        }

        const target = data.buildings.find((b) => b.name === building)

        if (!target) {
          return
        }

        if (
          quantity < CLICKER_OPTIONS.MIN_BUILDING_QUANTITY ||
          quantity > CLICKER_OPTIONS.MAX_BUILDING_QUANTITY
        ) {
          return
        }

        target.quantity = quantity

        set({ data: { ...data } })
      },
      getRps(calculator) {
        const DEFAULT_RPS = 0.5

        const data = get().data

        if (!data) {
          return DEFAULT_RPS
        }

        return data.buildings
          .filter((building) => building.quantity > 0)
          .reduce((acc, building) => {
            return (
              acc + calculator.calculateBuildingProduction(building.name, data) * building.quantity
            )
          }, DEFAULT_RPS)
      },
      getTotalProduction() {
        const DEFAULT_PRODUCTION = 0

        const data = get().data

        if (!data) {
          return DEFAULT_PRODUCTION
        }

        return data.buildings
          .filter((building) => building.quantity > 0)
          .reduce((acc, building) => {
            return acc + building.production
          }, DEFAULT_PRODUCTION)
      },
    }),
    {
      name: storageKey,
      storage: createJSONStorage(() => localStorage),
    }
  )
)
