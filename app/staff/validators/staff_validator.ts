import vine from '@vinejs/vine'

export const usageStatisticsValidator = vine.compile(
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
      playerCount: vine.number(),
      factionCount: vine.number(),
    })
  )
)

export const createUserValidator = vine.compile(
  vine.object({
    discordId: vine.string(),
    roles: vine.array(vine.string()),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    roles: vine.array(vine.string()),
  })
)

export const createRoleValidator = vine.compile(
  vine.object({
    name: vine.string().toUpperCase(),
    label: vine.string(),
    priority: vine.number().positive(),
    description: vine.string(),
  })
)

export const updateRoleValidator = vine.compile(
  vine.object({
    name: vine.string().toUpperCase().optional(),
    label: vine.string().optional(),
    priority: vine.number().positive().optional(),
    description: vine.string().optional(),
  })
)
