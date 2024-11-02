import vine from '@vinejs/vine'

export const calculatorOptionsValidator = vine.compile(
  vine
    .object({
      'job': vine.enum(['miner', 'farmer', 'hunter', 'alchemist']),
      'current-level': vine.number().withoutDecimals().min(1).max(100),
      'target-level': vine.number().withoutDecimals().min(1).max(100),
      'bonus-xp': vine.number().min(0).max(100),
      'current-xp': vine
        .number()
        .positive()
        .parse((value) => value || 0),
    })
    .toCamelCase()
)

const itemValidator = vine.object({
  currLevel: vine.number(),
  tarLevel: vine.number(),
  xp: vine.number(),
  amount: vine.number(),
  item: vine.object({
    type: vine.string(),
    action: vine.string(),
    xp: vine.number(),
    from: vine.number(),
    to: vine.number(),
  }),
})

export const calculatorResultValidator = vine.compile(
  vine.object({
    xpTotal: vine.number(),
    items: vine.object({
      without: vine.array(itemValidator.clone()),
      x2: vine.array(itemValidator.clone()),
      x10: vine.array(itemValidator.clone()),
    }),
  })
)
