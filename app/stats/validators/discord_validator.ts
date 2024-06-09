import vine from '@vinejs/vine'

export const discordStatsValidator = vine.compile(
  vine.object({
    support: vine.object({
      memberCount: vine.number(),
      online: vine.number(),
    }),
    bot: vine.object({
      servers: vine.number(),
      users: vine.number(),
      thirtyLastDaysCommands: vine.number(),
    }),
  })
)
