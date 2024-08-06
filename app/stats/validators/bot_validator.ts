import vine from '@vinejs/vine'

export const botStatsValidator = vine.compile(
  vine.object({
    guildsCount: vine.number(),
    usersCount: vine.number(),
  })
)
