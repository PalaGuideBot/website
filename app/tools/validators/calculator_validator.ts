import vine, { SimpleMessagesProvider } from '@vinejs/vine'

import { greaterThanRule } from '#core/validators/rules/greater_than'
import { parseItems } from '#tools/helpers/item'

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
      'mode': vine.enum(['standard', 'reverse']),
      'job': vine.enum(['miner', 'farmer', 'hunter', 'alchemist']),
      'current-level': vine.number().withoutDecimals().min(1),
      'bonus-xp': vine.number().min(0).max(500),
      'current-xp': vine
        .number()
        .positive()
        .parse((value) => value || 0),
    })
    .merge(
      vine.group([
        vine.group.if((data) => data.mode === 'standard', {
          'mode': vine.literal('standard'),
          'target-level': vine
            .number()
            .withoutDecimals()
            .min(1)
            .use(greaterThanRule({ otherField: 'current-level' })),
        }),
        vine.group.if((data) => data.mode === 'reverse', {
          mode: vine.literal('reverse'),
          items: vine.string().transform((value) => parseItems(value)),
        }),
      ])
    )
    .toCamelCase()
)

calculatorOptionsValidator.messagesProvider = new SimpleMessagesProvider(messages)

export const calculatorJobItemsValidator = vine.compile(
  vine.array(
    vine.object({
      type: vine.string(),
      id: vine.string(),
      action: vine.string(),
      from: vine.number(),
      xp: vine.number().parse((value) => value || 0),
      job: vine.enum(['miner', 'farmer', 'hunter', 'alchemist']),
    })
  )
)

const itemValidator = vine.object({
  type: vine.string(),
  id: vine.string(),
  action: vine.string(),
  xp: vine.number(),
  from: vine.number(),
  to: vine.number(),
})

const rewardValidator = vine.object({
  id: vine.string(),
  label: vine.string(),
  type: vine.string(),
  quantity: vine.number().optional(),
})

const standardItemsValidator = vine.array(
  vine.object({
    xp: vine.number(),
    amount: vine.number(),
    item: itemValidator.clone(),
  })
)

const reverseItemsValidator = vine.object({
  items: vine.array(vine.object({ item: itemValidator.clone(), xp: vine.number() })),
  totalXp: vine.number(),
  reachedLevel: vine.number(),
  rewards: vine.array(rewardValidator.clone()),
})

export const calculatorResultValidator = vine.compile(
  vine
    .object({
      mode: vine.enum(['standard', 'reverse']),
    })
    .merge(
      vine.group([
        vine.group.if((data) => data.mode === 'standard', {
          mode: vine.literal('standard'),
          result: vine.object({
            xpTotal: vine.number(),
            items: vine.object({
              without: standardItemsValidator.clone(),
              x2: standardItemsValidator.clone(),
              x10: standardItemsValidator.clone(),
            }),
            rewards: vine.array(rewardValidator.clone()),
          }),
        }),
        vine.group.if((data) => data.mode === 'reverse', {
          mode: vine.literal('reverse'),
          result: vine.object({
            without: reverseItemsValidator.clone(),
            x2: reverseItemsValidator.clone(),
            x10: reverseItemsValidator.clone(),
          }),
        }),
      ])
    )
)
