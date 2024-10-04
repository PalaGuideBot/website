import * as React from 'react'

import type { ClickerBuilding, ClickerUpgrades } from '#tools/types'
import { ClickerCalculator } from '~/lib/clicker'

type ClickerSettingsContextValue = {
  buildings: Omit<ClickerBuilding, 'quantity' | 'production'>[]
  upgrades: ClickerUpgrades
}

const ClickerSettingsContext = React.createContext<ClickerSettingsContextValue>(
  {} as ClickerSettingsContextValue
)

const ClickerSettings = ClickerSettingsContext.Provider

const useClickerSettings = () => {
  const context = React.useContext(ClickerSettingsContext)

  if (!context) {
    throw new Error('useClickerController should be used within <ClickerController>')
  }

  const { buildings, upgrades } = context

  const calculator = React.useMemo(
    () => new ClickerCalculator(buildings, upgrades),
    [buildings, upgrades]
  )

  return { buildings, upgrades, calculator }
}

export { ClickerSettings, useClickerSettings }
