import vine from '@vinejs/vine'

export const eventFactionQuestValidator = vine.compile(
  vine.object({
    item: vine.string(),
    quantity: vine.number(),
    earningMoney: vine.number(),
    earningXp: vine.number(),
    start: vine.number(),
    end: vine.number(),
  })
)
