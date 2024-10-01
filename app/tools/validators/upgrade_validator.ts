import vine from '@vinejs/vine'

export const conditionValidator = vine.object({
  type: vine.enum(['quantity', 'time', 'building', 'upgrade']),
  value: vine.unionOfTypes([vine.number(), vine.string()]),
})

export const clickUpgradeValidator = vine.object({
  name: vine.string(),
  label: vine.string(),
  price: vine.number(),
  conditions: vine.array(conditionValidator),
})

export const globalUpgradeValidator = vine.object({
  name: vine.string(),
  label: vine.string(),
  price: vine.number(),
  conditions: vine.array(conditionValidator),
})

export const terrainUpgradeValidator = vine.object({
  name: vine.string(),
  label: vine.string(),
  price: vine.number(),
  item: vine.array(vine.string()),
  conditions: vine.array(conditionValidator),
})

export const buildingUpgradeValidator = vine.object({
  name: vine.string(),
  label: vine.string(),
  price: vine.number(),
  item: vine.array(vine.string()),
  conditions: vine.array(conditionValidator),
})

export const manyUpgradeValidator = vine.object({
  name: vine.string(),
  price: vine.number(),
  item: vine.array(vine.string()),
  conditions: vine.array(conditionValidator),
})

export const posteriorUpgradeValidator = vine.object({
  name: vine.string(),
  price: vine.number(),
  activeItem: vine.array(vine.string()),
  previousItem: vine.array(vine.string()),
  conditions: vine.array(conditionValidator),
})

export const categoryValidator = vine.object({
  name: vine.string(),
  label: vine.string(),
  price: vine.number(),
  item: vine.array(vine.string()),
  pourcentage: vine.number(),
  conditions: vine.array(conditionValidator),
})

export const upgradesValidator = vine.compile(
  vine.object({
    clicks: vine.array(clickUpgradeValidator),
    globals: vine.array(globalUpgradeValidator),
    terrains: vine.array(terrainUpgradeValidator),
    buildings: vine.array(buildingUpgradeValidator),
    many: vine.array(manyUpgradeValidator),
    posteriors: vine.array(posteriorUpgradeValidator),
    categories: vine.array(categoryValidator),
  })
)
