import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const messages = {
  'block.required': 'Vous devez choisir un bloc',
  'current-level.required': 'Le niveau actuel doit être un nombre',
  'current-level.min': 'Le niveau actuel doit être supérieur à 0',
  'current-level.max': 'Le niveau actuel doit être inférieur à 101',
  'current-xp.required': 'Le niveau actuel doit être un nombre',
  'current-xp.positive': "L'XP actuelle doit être supérieur à 0",
  'good-pickaxe-percentage.required': 'Le % de compétence du pet doit être un nombre',
  'good-pickaxe-percentage.min': 'Le % de compétence du pet doit être supérieur ou égal à 0',
  'good-pickaxe-percentage.max': 'Le % de compétence du pet doit être inférieur ou égal à 40',
  'experienced-pickaxe-percentage.required': 'Le % de compétence du pet doit être un nombre',
  'experienced-pickaxe-percentage.min': 'Le % de compétence du pet doit être supérieur ou égal à 0',
  'experienced-pickaxe-percentage.max':
    'Le % de compétence du pet doit être inférieur ou égal à 30',
}

export const calculatorOptionsValidator = vine.compile(
  vine
    .object({
      'block': vine.string(),
      'current-level': vine.number().withoutDecimals().min(1).max(100),
      'current-xp': vine
        .number()
        .positive()
        .parse((value) => value || 0),
      'good-pickaxe-percentage': vine
        .number()
        .min(0)
        .max(40)
        .parse((value) => value || 0),
      'experienced-pickaxe-percentage': vine
        .number()
        .min(0)
        .max(30)
        .parse((value) => value || 0),
    })
    .toCamelCase()
)

calculatorOptionsValidator.messagesProvider = new SimpleMessagesProvider(messages)

const OSStateValidator = vine.object({
  from: vine.number(),
  targetTier: vine.number(),
  xp: vine.number(),
  amount: vine.number(),
  current: vine.boolean(),
})

const itemValidator = vine.object({
  name: vine.string(),
  id: vine.string(),
  xp: vine.number(),
  os: vine.object({
    default: OSStateValidator.clone(),
    with_mixed: OSStateValidator.clone(),
    with_green: OSStateValidator.clone(),
    with_pet_skill: OSStateValidator.clone(),
    with_pet_skill_and_mixed: OSStateValidator.clone(),
  }),
})

export const calculatorItemsValidator = vine.compile(
  vine.array(
    vine.object({
      name: vine.string(),
      id: vine.string(),
      xp: vine.number(),
    })
  )
)

export const calculatorResultValidator = vine.compile(
  vine.object({
    item: itemValidator.clone(),
    currentTier: vine.number(),
    items: vine.array(itemValidator.clone()),
  })
)
