import vine from '@vinejs/vine'

const status = vine.enum(['online', 'offline', 'maintenance'])
const factionStatus = vine.enum(['running', 'offline', 'starting', 'restarting', 'stopping'])

export const paladiumStatusValidator = vine.compile(
  vine.array(
    vine.object({
      data: vine.object({
        java: vine.object({
          global: vine.object({
            status: status.clone(),
            players: vine.number(),
          }),
          factions: vine.object({
            Soleratl: factionStatus.clone(),
            Muzdan: factionStatus.clone(),
            Manashino: factionStatus.clone(),
            Event: factionStatus.clone(),
            Luccento: factionStatus.clone(),
            Imbali: factionStatus.clone(),
            Keltis: factionStatus.clone(),
            Neolith: factionStatus.clone(),
            Untaa: factionStatus.clone(),
          }),
        }),
        launcher: vine.object({
          status: status.clone(),
        }),
      }),
      _id: vine.string(),
      date: vine.string(),
      __v: vine.number(),
    })
  )
)
