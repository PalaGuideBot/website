import vine from '@vinejs/vine'

export const staffStatisticsValidator = vine.compile(
  vine.array(
    vine.object({
      date: vine.string(),
      interactionsCount: vine.number(),
      guildsCount: vine.number(),
      usersCount: vine.number(),
      guilds: vine.array(
        vine.object({
          id: vine.string(),
          name: vine.string(),
          icon: vine.string(),
          memberCount: vine.number(),
        })
      ),
      interactions: vine.array(
        vine.object({
          name: vine.string(),
          count: vine.number(),
        })
      ),
      endpoints: vine.array(
        vine.object({
          name: vine.string(),
          count: vine.number(),
          averageTime: vine.number(),
          maxTime: vine.number(),
          minTime: vine.number(),
        })
      ),
      keys: vine.array(
        vine.object({
          key: vine.string(),
          count: vine.number(),
          ip: vine.number(),
        })
      ),
      uniquePlayerInDataBase: vine.number(),
      uniqueFactionInDataBase: vine.number(),
    })
  )
)
