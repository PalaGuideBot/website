import vine from '@vinejs/vine'

export const staffStatisticsValidator = vine.compile(
  vine.array(
    vine.object({
      date: vine.string(),
      discord: vine.object({
        guildsCount: vine.number(),
        usersCount: vine.number(),
        interactionsCount: vine.number(),
        guildsList: vine.array(
          vine.object({
            id: vine.string(),
            name: vine.string(),
            membersCount: vine.number(),
            interactions: vine.number(),
            icon: vine.string().nullable(),
          })
        ),
        interactionList: vine.array(
          vine.object({
            name: vine.string(),
            interactions: vine.number(),
          })
        ),
      }),
      api: vine.object({
        key: vine.array(
          vine.object({ key: vine.string(), count: vine.number(), ip: vine.string() })
        ),
        endpoint: vine.array(
          vine.object({
            name: vine.string(),
            count: vine.number(),
            averageTime: vine.number(),
            maxTime: vine.number(),
            minTime: vine.number(),
          })
        ),
      }),
    })
  )
)
