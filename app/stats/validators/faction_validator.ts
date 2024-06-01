import vine from '@vinejs/vine'

export const factionInfoValidator = vine.compile(
  vine.object({
    uuid: vine.string(),
    name: vine.string(),
    description: vine.string(),
    createdAt: vine.number(),
    players: vine.array(
      vine.object({
        uuid: vine.string().uuid(),
        username: vine.string(),
        group: vine.string(),
        joinedAt: vine.number(),
      })
    ),
    emblem: vine.string(),
    data: vine.array(
      vine.object({
        date: vine.string(),
        timestamp: vine.number(),
        data: vine.object({
          level: vine.object({
            level: vine.number(),
            xp: vine.number(),
          }),
          elo: vine.object({
            elo: vine.number(),
            position: vine.number(),
          }),
        }),
      })
    ),
  })
)
