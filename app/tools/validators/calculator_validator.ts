import vine, { SimpleMessagesProvider } from '@vinejs/vine'

import { greaterThanRule } from '#core/validators/rules/greater_than'

const messages = {
  'job.enum': 'Métier invalide',
  'current-level.number': 'Le niveau actuel doit être un nombre',
  'current-level.min': 'Le niveau actuel doit être supérieur à 0',
  'current-level.max': 'Le niveau actuel doit être inférieur à 101',
  'target-level.number': 'Le niveau cible doit être un nombre',
  'target-level.min': 'Le niveau cible doit être supérieur à 0',
  'target-level.max': 'Le niveau cible doit être inférieur à 101',
  'target-level.greaterThan': 'Le niveau cible doit être supérieur au niveau actuel',
  'bonus-xp.number': 'Le bonus XP doit être un nombre',
  'bonus-xp.min': "L'XP bonus doit être supérieur à 0",
  'bonus-xp.max': "L'XP bonus doit être inférieur ou égale à 500",
  'current-xp.number': "L'XP actuel doit être un nombre",
  'current-xp.positive': "L'XP actuel doit être supérieur ou égal à 0",
}

export const calculatorOptionsValidator = vine.compile(
  vine
    .object({
      'job': vine.enum(['miner', 'farmer', 'hunter', 'alchemist']),
      'current-level': vine.number().withoutDecimals().min(1).max(100),
      'target-level': vine
        .number()
        .withoutDecimals()
        .min(1)
        .max(100)
        .use(greaterThanRule({ otherField: 'current-level' })),
      'bonus-xp': vine.number().min(0).max(500),
      'current-xp': vine
        .number()
        .positive()
        .parse((value) => value || 0),
    })
    .toCamelCase()
)

calculatorOptionsValidator.messagesProvider = new SimpleMessagesProvider(messages)

const itemValidator = vine.object({
  xp: vine.number(),
  amount: vine.number(),
  item: vine.object({
    type: vine.string(),
    id: vine.string(),
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
    rewards: vine.array(
      vine.object({
        id: vine.string(),
        label: vine.string(),
        type: vine.string(),
        quantity: vine.number().optional(),
      })
    ),
  })
)
