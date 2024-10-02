import type {
  ClickerAnyUpgrade,
  ClickerBuilding,
  ClickerUpgrades,
  PlayerClickerData,
} from '#tools/types'

export const CLICKER_OPTIONS = {
  MIN_BUILDING_QUANTITY: 0,
  MAX_BUILDING_QUANTITY: 99,
  DEFAULT_RPS: 0.5,
}

export function getBuildingPrice(basePrice: number, quantity: number) {
  return basePrice * Math.pow(1.100000023841858, quantity)
}

export function getClickerBuildingImage(name: string) {
  return `https://image.palaguidebot.fr/clicker/buildings/${name}`
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

  return `https://image.palaguidebot.fr/clicker/upgrades/${upgrade.type}/${name}`
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
        percentage += playerJobs?.miner?.level ?? 0 * 0.01
        break
      case terrain.name.includes('farmer'):
        percentage += playerJobs?.farmer?.level ?? 0 * 0.01
        break
      case terrain.name.includes('hunter'):
        percentage += playerJobs?.hunter?.level ?? 0 * 0.01
        break
      case terrain.name.includes('alchemist'):
        percentage += playerJobs?.alchemist?.level ?? 0 * 0.01
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
}
