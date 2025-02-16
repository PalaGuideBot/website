import vine from '@vinejs/vine'

export const factionInfoValidator = vine.compile(
  vine.object({
    uuid: vine.string(),
    date: vine.string().nullable().optional(),
    name: vine.string(),
    bgName: vine.string(),
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
    emblemUrl: vine.string(),
    alliance: vine.enum(['CHAOS', 'ORDER', 'NULL']).nullable().optional(),
  })
)
