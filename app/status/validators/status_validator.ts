import vine from '@vinejs/vine'

const status = vine.array(
  vine.object({
    from: vine.string(),
    to: vine.string(),
    status: vine.enum(['offline', 'online', 'maintenance']),
  })
)
const factionStatus = vine.array(
  vine.object({
    from: vine.string(),
    to: vine.string(),
    status: vine.enum([
      'unknown',
      'offline',
      'starting',
      'running',
      'restarting',
      'stopping',
      'whitelist',
    ]),
  })
)

const statsValidator = vine.object({
  java: vine.object({
    global: vine.object({
      status: status.clone(),
      players: vine.number(),
    }),
    factions: vine.object({
      Runegard: factionStatus.clone(),
      Xanoth: factionStatus.clone(),
      Egopolis: factionStatus.clone(),
      Kilmordra: factionStatus.clone(),
      Aeloria: factionStatus.clone(),
    }),
  }),
  launcher: vine.object({
    status: status.clone(),
  }),
})

export const paladiumStatusValidator = vine.compile(
  vine.object({
    hour: vine.array(
      vine.object({
        date: vine.string(),
        hour: vine.string(),
        data: statsValidator.clone(),
      })
    ),
    day: vine.array(
      vine.object({
        date: vine.string(),
        hour: vine.string().optional(),
        data: statsValidator.clone(),
      })
    ),
  })
)
