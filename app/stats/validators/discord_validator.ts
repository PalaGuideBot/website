import vine from '@vinejs/vine'

export const discordStatsValidator = vine.compile(
  vine.object({
    guildsCount: vine.number(),
    usersCount: vine.number(),
  })
)
