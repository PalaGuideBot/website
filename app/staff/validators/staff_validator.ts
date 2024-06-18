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
            interactionsCount: vine.number(),
            icon: vine.string().nullable(),
          })
        ),
        interactionsList: vine
          .array(
            vine.object({
              name: vine.string(),
              interactions: vine.number(),
            })
          )
          .optional(),
      }),
      api: vine.object({
        keys: vine
          .array(
            vine.object({
              key: vine.string().optional(),
              count: vine.number(),
              ip: vine.unionOfTypes([vine.string(), vine.number()]),
            })
          )
          .optional(),
        endpoints: vine
          .array(
            vine.object({
              name: vine.string(),
              count: vine.number(),
              averageTime: vine.number(),
              maxTime: vine.number(),
              minTime: vine.number(),
            })
          )
          .optional(),
      }),
    })
  )
)
