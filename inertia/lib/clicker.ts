import { DateTime } from '~/lib/luxon'

import type {
  BestBuyableType,
  BuyableAnyUpgrade,
  ClickerAnyUpgrade,
  ClickerBuilding,
  ClickerUpgrades,
  PlayerClickerData,
} from '#tools/types'
import { getSeasonStart } from './paladium'

export const CLICKER_OPTIONS = {
  MIN_BUILDING_QUANTITY: 0,
  MAX_BUILDING_QUANTITY: 99,
  DEFAULT_RPS: 0.5,
}

export function getBuildingPrice(basePrice: number, quantity: number) {
  return basePrice * Math.pow(1.100000023841858, quantity)
}

export function getClickerBuildingImage(name: string) {
  return `https://image.palaguidebot.fr/clicker/buildings/${name}.webp`
}

export function getClickerUpgradeImage(upgrade: ClickerAnyUpgrade) {
  let name: string

  switch (upgrade.type) {
    case 'building':
      name = upgrade.data.name.slice(-1)
      break
    case 'many':
      name = upgrade.type
      break
    case 'posterior':
      name = upgrade.type
      break
    default:
      name = upgrade.data.name
      break
  }

  return `https://image.palaguidebot.fr/clicker/upgrades/${upgrade.type}/${name}.webp`
}

export function getPlayerTotalProduction(playerBuildings: PlayerClickerData['buildings']) {
  return playerBuildings
    .filter((building) => building.quantity > 0)
    .reduce((acc, building) => {
      return acc + building.production
    }, 0)
}

export class ClickerCalculator {
  constructor(
    private buildings: Omit<ClickerBuilding, 'quantity' | 'production'>[],
    private upgrades: ClickerUpgrades
  ) {}

  private getTerrainUpgradeBonusByBuilding(
    targetBuilding: string,
    playerUpgrades: PlayerClickerData['upgrades'],
    playerJobs: PlayerClickerData['jobs']
  ) {
    let percentage = 0
    const terrain = this.upgrades.terrains.find(
      (item) => item.item.includes(targetBuilding) && playerUpgrades.includes(item.name)
    )

    //TODO: vérifier lorsque l'on a plus de 1 terrain

    if (!terrain) {
      return percentage
    }

    switch (true) {
      case terrain.name.includes('miner'):
        percentage += playerJobs.miner.level * 0.01
        break
      case terrain.name.includes('farmer'):
        percentage += playerJobs.farmer.level * 0.01
        break
      case terrain.name.includes('hunter'):
        percentage += playerJobs.hunter.level * 0.01
        break
      case terrain.name.includes('alchemist'):
        percentage += playerJobs.alchemist.level * 0.01
        break
    }

    // TODO: vérifier lorsque l'on a un terrain inconnu

    return percentage
  }

  private getGlobalUpgradeBonus(playerUpgrades: PlayerClickerData['upgrades']) {
    const ownedUpgrades = this.upgrades.globals.filter((upgrade) =>
      playerUpgrades.includes(upgrade.name)
    )
    return ownedUpgrades.length * 0.1
  }

  private getCategoryUpgradeBonusByBuilding(
    targetBuilding: string,
    playerUpgrades: PlayerClickerData['upgrades']
  ) {
    const ownedUpgrades = this.upgrades.categories.filter(
      (upgrade) => playerUpgrades.includes(upgrade.name) && upgrade.item.includes(targetBuilding)
    )
    return ownedUpgrades.reduce((acc, upgrade) => acc + upgrade.pourcentage, 0)
  }

  private getManyUpgradeBonusByBuilding(
    targetBuilding: string,
    playerUpgrades: PlayerClickerData['upgrades'],
    playerBuildings: PlayerClickerData['buildings']
  ) {
    const many = this.upgrades.many.find(
      (upgrade) => playerUpgrades.includes(upgrade.name) && upgrade.item.includes(targetBuilding)
    )

    //TODO: vérifier lorsque l'on a plus de 1 upgrade

    if (many) {
      const building = playerBuildings.find(
        (playerBuilding) => playerBuilding.name === targetBuilding
      )

      return Number(building?.quantity) * 0.01
    }

    return 0
  }

  private getBuildingUpgradeBonus(
    targetBuilding: string,
    playerUpgrades: PlayerClickerData['upgrades']
  ) {
    const ownedBuildings = this.upgrades.buildings.filter(
      (upgrade) => playerUpgrades.includes(upgrade.name) && upgrade.item.includes(targetBuilding)
    )

    //TODO: vérifier lorsque l'on a plus de 2 upgrades

    return ownedBuildings.length
  }

  private getPosteriorUpgradeBonus(
    targetBuilding: string,
    playerUpgrades: PlayerClickerData['upgrades'],
    playerBuildings: PlayerClickerData['buildings']
  ) {
    const posterior = this.upgrades.posteriors.find(
      (upgrade) =>
        playerUpgrades.includes(upgrade.name) && upgrade.activeItem.includes(targetBuilding)
    )

    // TODO: vérifier lorsque l'on a plus de 1 upgrade

    if (posterior) {
      const building = playerBuildings.find((playerBuilding) =>
        posterior.previousItem.includes(playerBuilding.name)
      )

      return Number(building?.quantity) * 0.01
    }

    return 0
  }

  calculateBuildingProduction(targetBuilding: string, playerClickerData: PlayerClickerData) {
    const building = playerClickerData.buildings.find(
      (playerBuilding) => playerBuilding.name === targetBuilding
    )

    const buildingBaseProduction = Number(
      this.buildings.find((item) => item.name === targetBuilding)?.base_production
    )

    if (!building) {
      return 0
    }

    const terrainBonus = this.getTerrainUpgradeBonusByBuilding(
      targetBuilding,
      playerClickerData.upgrades,
      playerClickerData.jobs
    )
    const globalBonus = this.getGlobalUpgradeBonus(playerClickerData.upgrades)
    const categoryBonus = this.getCategoryUpgradeBonusByBuilding(
      targetBuilding,
      playerClickerData.upgrades
    )
    const manyBonus = this.getManyUpgradeBonusByBuilding(
      targetBuilding,
      playerClickerData.upgrades,
      playerClickerData.buildings
    )
    const buildingBonus = this.getBuildingUpgradeBonus(targetBuilding, playerClickerData.upgrades)
    const posteriorBonus = this.getPosteriorUpgradeBonus(
      targetBuilding,
      playerClickerData.upgrades,
      playerClickerData.buildings
    )

    const bonuses = [
      terrainBonus,
      globalBonus,
      categoryBonus,
      manyBonus,
      buildingBonus,
      posteriorBonus,
    ]

    const bonus = bonuses.reduce((acc, value) => acc + value, 1)

    return buildingBaseProduction * bonus
  }

  getPlayerRps(playerClickerData: PlayerClickerData) {
    return playerClickerData.buildings
      .filter((building) => building.quantity > 0)
      .reduce((acc, building) => {
        return (
          acc +
          this.calculateBuildingProduction(building.name, playerClickerData) * building.quantity
        )
      }, CLICKER_OPTIONS.DEFAULT_RPS)
  }

  getPlayerTotalSpent(
    playerBuildings: PlayerClickerData['buildings'],
    playerUpgrades: PlayerClickerData['upgrades']
  ) {
    const buildingSpent = playerBuildings
      .filter((building) => building.quantity > 0)
      .map((building) => {
        let total = 0
        for (let i = 0; i < building.quantity; i++) {
          total += getBuildingPrice(building.base_price, i)
        }
        return total
      })
      .reduce((acc, total) => {
        return acc + total
      }, 0)

    const unlockedUpgradesPrices = [
      /* --- CLICKS ---*/
      ...this.upgrades.clicks
        .filter((click) => playerUpgrades.includes(click.name))
        .map((click) => ({ price: click.price })),
      /* --- GLOBALS ---*/
      ...this.upgrades.globals
        .filter((global) => playerUpgrades.includes(global.name))
        .map((global) => ({ price: global.price })),
      /* --- BUILDINGS ---*/
      ...this.upgrades.buildings
        .filter((building) => playerUpgrades.includes(building.name))
        .map((building) => ({ price: building.price })),
      /* --- CATEGORIES ---*/
      ...this.upgrades.categories
        .filter((category) => playerUpgrades.includes(category.name))
        .map((category) => ({ price: category.price })),
      /* --- MANY ---*/
      ...this.upgrades.many
        .filter((many) => playerUpgrades.includes(many.name))
        .map((many) => ({ price: many.price })),
      /* --- POSTERIORS ---*/
      ...this.upgrades.posteriors
        .filter((posterior) => playerUpgrades.includes(posterior.name))
        .map((posterior) => ({ price: posterior.price })),
      /* --- TERRAINS ---*/
      ...this.upgrades.terrains
        .filter((terrain) => playerUpgrades.includes(terrain.name))
        .map((terrain) => ({ price: terrain.price })),
    ]

    const upgradesSpent = unlockedUpgradesPrices.reduce((acc, upgrade) => {
      return acc + upgrade.price
    }, 0)

    return buildingSpent + upgradesSpent
  }

  isUpgradeUnlockable(
    upgrade: ClickerAnyUpgrade,
    playerBuildings: PlayerClickerData['buildings'],
    playerUpgrades: PlayerClickerData['upgrades']
  ) {
    const conditions = upgrade.data.conditions.map((condition) => {
      let target = null
      switch (condition.type) {
        case 'building':
          switch (upgrade.type) {
            case 'building':
            case 'many':
            case 'category':
              target = playerBuildings.find((b) => b.name === upgrade.data.item[0])
              return Number(target?.quantity) >= Number(condition.value)
            case 'posterior':
              target = playerBuildings.find((b) => b.name === upgrade.data.activeItem[0])
              return Number(target?.quantity) >= Number(condition.value)
            default:
              return true
          }
        case 'quantity':
          const playerProduction = Math.max(
            getPlayerTotalProduction(playerBuildings),
            this.getPlayerTotalSpent(playerBuildings, playerUpgrades)
          )
          return Number(condition.value) !== -1 && playerProduction >= Number(condition.value)
        case 'time':
          const seasonStart = getSeasonStart()
          const now = DateTime.now()
          const elapsedDays = now.diff(seasonStart, 'days').days

          return elapsedDays >= Number(condition.value)
        case 'upgrade':
          switch (upgrade.type) {
            case 'click':
              return playerUpgrades.includes(String(condition.value))
            default:
              return true
          }
        default:
          return true
      }
    })

    return conditions.every((condition) => condition)
  }

  getBestBuildingToBuy(playerClickerData: PlayerClickerData) {
    let ownedBuildings = playerClickerData.buildings.filter((building) => building.quantity > 0)
    if (ownedBuildings.length !== playerClickerData.buildings.length) {
      const nextBuilding = this.buildings.at(ownedBuildings.length)

      if (nextBuilding) {
        ownedBuildings.push({ ...nextBuilding, production: 0, quantity: 0 })
      }
    }

    const currentRps = this.getPlayerRps(playerClickerData)

    let bestBuilding: string | null = null
    let bestRatio = 0
    let upgradedRps = currentRps

    for (const building of ownedBuildings) {
      if (building.quantity >= CLICKER_OPTIONS.MAX_BUILDING_QUANTITY) {
        continue
      }

      const upgradedBuilding = { ...building, quantity: building.quantity + 1 }

      const upgradedBuildingPrice = getBuildingPrice(
        upgradedBuilding.base_price,
        upgradedBuilding.quantity
      )

      const newRps = this.getPlayerRps({
        ...playerClickerData,
        buildings: playerClickerData.buildings
          .filter((b) => b.name !== building.name)
          .concat(upgradedBuilding),
      })

      const ratio = (newRps - currentRps) / upgradedBuildingPrice

      if (ratio > bestRatio) {
        bestBuilding = building.name
        bestRatio = ratio
        upgradedRps = newRps
      }
    }

    return {
      bestBuilding,
      bestRatio,
      upgradedRps,
    }
  }

  getBestUpgradeToBuy(playerClickerData: PlayerClickerData) {
    const currentRps = this.getPlayerRps(playerClickerData)

    let bestUpgrade: { type: BuyableAnyUpgrade['type']; value: string } | null = null
    let bestRatio = 0
    let upgradedRps = currentRps

    const unlockableUpgrades: Array<BuyableAnyUpgrade> = [
      /* --- GLOBALS ---*/
      ...this.upgrades.globals
        .filter(
          (global) =>
            this.isUpgradeUnlockable(
              { type: 'global', data: global },
              playerClickerData.buildings,
              playerClickerData.upgrades
            ) && !playerClickerData.upgrades.includes(global.name)
        )
        .map((global) => ({ type: 'global' as const, data: global })),
      /* --- BUILDINGS ---*/
      ...this.upgrades.buildings
        .filter(
          (building) =>
            this.isUpgradeUnlockable(
              { type: 'building', data: building },
              playerClickerData.buildings,
              playerClickerData.upgrades
            ) && !playerClickerData.upgrades.includes(building.name)
        )
        .map((building) => ({ type: 'building' as const, data: building })),
      /* --- CATEGORIES ---*/
      ...this.upgrades.categories
        .filter(
          (category) =>
            this.isUpgradeUnlockable(
              { type: 'category', data: category },
              playerClickerData.buildings,
              playerClickerData.upgrades
            ) && !playerClickerData.upgrades.includes(category.name)
        )
        .map((category) => ({ type: 'category' as const, data: category })),
      /* --- MANY ---*/
      ...this.upgrades.many
        .filter(
          (many) =>
            this.isUpgradeUnlockable(
              { type: 'many', data: many },
              playerClickerData.buildings,
              playerClickerData.upgrades
            ) && !playerClickerData.upgrades.includes(many.name)
        )
        .map((many) => ({ type: 'many' as const, data: many })),
      /* --- POSTERIORS ---*/
      ...this.upgrades.posteriors
        .filter(
          (posterior) =>
            this.isUpgradeUnlockable(
              { type: 'posterior', data: posterior },
              playerClickerData.buildings,
              playerClickerData.upgrades
            ) && !playerClickerData.upgrades.includes(posterior.name)
        )
        .map((posterior) => ({ type: 'posterior' as const, data: posterior })),
      /* --- TERRAINS ---*/
      ...this.upgrades.terrains
        .filter(
          (terrain) =>
            this.isUpgradeUnlockable(
              { type: 'terrain', data: terrain },
              playerClickerData.buildings,
              playerClickerData.upgrades
            ) && !playerClickerData.upgrades.includes(terrain.name)
        )
        .map((terrain) => ({ type: 'terrain' as const, data: terrain })),
    ]

    for (const upgrade of unlockableUpgrades) {
      const newUpgrades = [...playerClickerData.upgrades, upgrade.data.name]
      const newRps = this.getPlayerRps({ ...playerClickerData, upgrades: newUpgrades })

      const ratio = (newRps - currentRps) / upgrade.data.price

      if (ratio > bestRatio) {
        bestUpgrade = { type: upgrade.type, value: upgrade.data.name }
        bestRatio = ratio
        upgradedRps = newRps
      }
    }

    return {
      bestUpgrade,
      bestRatio,
      upgradedRps,
    }
  }

  getBestBuildingOrUpgradeToBuy(playerClickerData: PlayerClickerData): BestBuyableType {
    const bestBuilding = this.getBestBuildingToBuy(playerClickerData)
    const bestUpgrade = this.getBestUpgradeToBuy(playerClickerData)

    if (!bestBuilding.bestBuilding && !bestUpgrade.bestUpgrade) {
      return null
    }

    if (bestBuilding.bestRatio > bestUpgrade.bestRatio) {
      const building = playerClickerData.buildings.find(
        (item) => item.name === bestBuilding.bestBuilding!
      )!
      return {
        type: 'building',
        building: { ...building, quantity: building.quantity + 1 },
        upgradedRps: bestBuilding.upgradedRps,
      }
    }

    let upgrade: BuyableAnyUpgrade
    switch (bestUpgrade.bestUpgrade!.type) {
      case 'global':
        upgrade = {
          type: bestUpgrade.bestUpgrade!.type,
          data: this.upgrades.globals.find((item) => item.name === bestUpgrade.bestUpgrade!.value)!,
        }
        break
      case 'building':
        upgrade = {
          type: bestUpgrade.bestUpgrade!.type,
          data: this.upgrades.buildings.find(
            (item) => item.name === bestUpgrade.bestUpgrade!.value
          )!,
        }
        break
      case 'category':
        upgrade = {
          type: bestUpgrade.bestUpgrade!.type,
          data: this.upgrades.categories.find(
            (item) => item.name === bestUpgrade.bestUpgrade!.value
          )!,
        }
        break
      case 'many':
        upgrade = {
          type: bestUpgrade.bestUpgrade!.type,
          data: this.upgrades.many.find((item) => item.name === bestUpgrade.bestUpgrade!.value)!,
        }
        break
      case 'posterior':
        upgrade = {
          type: bestUpgrade.bestUpgrade!.type,
          data: this.upgrades.posteriors.find(
            (item) => item.name === bestUpgrade.bestUpgrade!.value
          )!,
        }
        break
      case 'terrain':
        upgrade = {
          type: bestUpgrade.bestUpgrade!.type,
          data: this.upgrades.terrains.find(
            (item) => item.name === bestUpgrade.bestUpgrade!.value
          )!,
        }
        break
    }

    return {
      type: 'upgrade',
      upgrade: upgrade,
      upgradedRps: bestUpgrade.upgradedRps,
    }
  }
}
