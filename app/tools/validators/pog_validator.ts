import vine, { SimpleMessagesProvider } from '@vinejs/vine'

import { greaterThanRule } from '#core/validators/rules/greater_than'

const messages = {
  'current-level.number': 'Le niveau actuel doit être un nombre',
  'current-level.min': 'Le niveau actuel doit être supérieur à 0',
  'current-level.max': 'Le niveau actuel doit être inférieur à 101',
  'target-level.number': 'Le niveau cible doit être un nombre',
  'target-level.min': 'Le niveau cible doit être supérieur à 0',
  'target-level.max': 'Le niveau cible doit être inférieur à 101',
  'target-level.greaterThan': 'Le niveau cible doit être supérieur au niveau actuel',
  'pet-skill-percentage.number': 'Le % de compétence du pet doit être un nombre',
  'pet-skill-percentage.min': 'Le % de compétence du pet doit être supérieur ou égal à 0',
  'pet-skill-percentage.max': 'Le % de compétence du pet doit être inférieur ou égal à 40',
}

export const calculatorOptionsValidator = vine.compile(
  vine
    .object({
      'current-level': vine.number().withoutDecimals().min(1).max(100),
      'target-level': vine
        .number()
        .withoutDecimals()
        .min(1)
        .max(100)
        .use(greaterThanRule({ otherField: 'current-level' })),
      'pet-skill-percentage': vine
        .number()
        .min(0)
        .max(40)
        .parse((value) => value || 0),
    })
    .toCamelCase()
)

calculatorOptionsValidator.messagesProvider = new SimpleMessagesProvider(messages)

const OSStateValidator = vine.object({
  from: vine.number(),
  amount: vine.number(),
  targeted: vine.boolean(),
  current: vine.boolean(),
})

const itemValidator = vine.object({
  name: vine.string(),
  id: vine.string(),
  xp: vine.number(),
  os: vine.object({
    default: OSStateValidator.clone(),
    with_mixed: OSStateValidator.clone(),
    with_pet_skill: OSStateValidator.clone(),
    with_pet_skill_and_mixed: OSStateValidator.clone(),
  }),
})

export const calculatorResultValidator = vine.compile(
  vine.object({
    xpTotal: vine.number(),
    currentTier: vine.number(),
    targetTier: vine.number(),
    items: vine.array(itemValidator.clone()),
  })
)
