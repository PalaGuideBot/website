import type { Infer } from '@vinejs/vine/types'

import type { playerClickerDataValidator } from '#stats/validators/player_validator'
import type {
  buildingUpgradeValidator,
  categoryValidator,
  clickUpgradeValidator,
  conditionValidator,
  globalUpgradeValidator,
  manyUpgradeValidator,
  posteriorUpgradeValidator,
  terrainUpgradeValidator,
  upgradesValidator,
} from '#tools/validators/upgrade_validator'

export type PlayerClickerData = Infer<typeof playerClickerDataValidator>

export type ClickerBuilding = PlayerClickerData['buildings'][number]

export type ClickerUpgradeCondition = Infer<typeof conditionValidator>
export type ClickerUpgrades = Infer<typeof upgradesValidator>

export type ClickerClickUpgrade = Infer<typeof clickUpgradeValidator>
export type ClickerGlobalUpgrade = Infer<typeof globalUpgradeValidator>
export type ClickerTerrainUpgrade = Infer<typeof terrainUpgradeValidator>
export type ClickerBuildingUpgrade = Infer<typeof buildingUpgradeValidator>
export type ClickerManyUpgrade = Infer<typeof manyUpgradeValidator>
export type ClickerPosteriorUpgrade = Infer<typeof posteriorUpgradeValidator>
export type ClickerCategoryUpgrade = Infer<typeof categoryValidator>

export type ClickerAnyUpgrade =
  | {
      type: 'click'
      data: ClickerClickUpgrade
    }
  | {
      type: 'global'
      data: ClickerGlobalUpgrade
    }
  | {
      type: 'terrain'
      data: ClickerTerrainUpgrade
    }
  | {
      type: 'building'
      data: ClickerBuildingUpgrade
    }
  | {
      type: 'many'
      data: ClickerManyUpgrade
    }
  | {
      type: 'posterior'
      data: ClickerPosteriorUpgrade
    }
  | {
      type: 'category'
      data: ClickerCategoryUpgrade
    }
