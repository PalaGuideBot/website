import vine from '@vinejs/vine'

import { userRoleSchema } from '#staff/validators/user_validator'

const jobValidator = vine.object({
  level: vine.number(),
  xp: vine.number(),
})

const leaderboardValidator = vine.object({
  boss: vine.number(),
  money: vine.number(),
  end: vine.number(),
  koth: vine.number(),
  chorus: vine.number(),
  egghunt: vine.number(),
  //corruption: vine.number(),
  clicker: vine.number(),
  trixium: vine.number(),
  job_miner: vine.number(),
  job_farmer: vine.number(),
  job_hunter: vine.number(),
  job_alchemist: vine.number(),
})

const achievementsValidator = vine.object({
  completed: vine.number(),
  incomplete: vine.number(),
  total: vine.number(),
})

const friendsValidator = vine.array(
  vine.object({
    uuid: vine.string().uuid(),
    username: vine.string(),
    rank: vine.string(),
  })
)

const mountValidator = vine.object({
  mountType: vine.number(),
  name: vine.string(),
  // damage: vine.number(),
  food: vine.number(),
  // sharedXpPercent: vine.number(),
  xp: vine.number(),
  level: vine.number(),
})

const petValidator = vine.object({
  currentSkin: vine.string(),
  happiness: vine.number(),
  level: vine.number(),
  /* skills: vine.array(
    vine.object({
      id: vine.string(),
      lastChange: vine.number(),
      nextUse: vine.number(),
    })
  ), */
})

export const marketValidator = vine.object({
  data: vine.array(
    vine.object({
      category: vine.enum([
        'PVP',
        'LUCKY_BLOCK',
        'BUILD',
        'TOOLS',
        'RARE',
        'OTHER',
        'LUCKYDRAWER',
        'STUFF',
      ]),
      createdAt: vine.number(),
      durability: vine.number(),
      expireAt: vine.number(),
      item: vine.object({
        meta: vine.number(),
        name: vine.string(),
        quantity: vine.number(),
      }),
      name: vine.string(),
      price: vine.number(),
      pricePb: vine.number(),
      renamed: vine.boolean(),
      skin: vine.number(),
      slot: vine.number(),
      type: vine.string(),
    })
  ),
  totalCount: vine.number(),
  lastUpdate: vine.string(),
})

export const playerInfoValidator = vine.compile(
  vine.object({
    uuid: vine.string().uuid(),
    username: vine.string(),
    firstSeen: vine.number(),
    leaderboard: leaderboardValidator,
    achievements: achievementsValidator,
    friends: friendsValidator,
    mount: mountValidator.optional().nullable(),
    pet: petValidator.optional().nullable(),
    data: vine.array(
      vine.object({
        data: vine.object({
          jobs: vine.object({
            miner: jobValidator.clone(),
            farmer: jobValidator.clone(),
            hunter: jobValidator.clone(),
            alchemist: jobValidator.clone(),
          }),
          faction: vine.string(),
          factionRank: vine.string().optional().nullable(),
          money: vine.number(),
          rank: vine.string(),
          timePlayed: vine.number(),
          clicker: vine
            .object({
              rps: vine.number(),
              production: vine.number(),
            })
            .optional(),
        }),
        date: vine.string(),
      })
    ),
    flags: vine.array(userRoleSchema.clone()),
    market: marketValidator.clone(),
  })
)

export const playerClickerDataValidator = vine.compile(
  vine.object({
    username: vine.string(),
    uuid: vine.string().uuid(),
    jobs: vine.object({
      miner: jobValidator.clone(),
      farmer: jobValidator.clone(),
      hunter: jobValidator.clone(),
      alchemist: jobValidator.clone(),
    }),
    buildings: vine.array(
      vine.object({
        name: vine.string(),
        label: vine.string(),
        category: vine.string().optional(),
        base_price: vine.number(),
        base_production: vine.number(),
        production: vine.number(),
        quantity: vine.number(),
      })
    ),
    lastBuildingBought: vine.string(),
    rps: vine.number(),
    upgrades: vine.array(vine.string()),
    state: vine.enum(['UNKNOWN_ERROR', 'NOT_FOUND', 'UNAUTHORIZED']).optional(),
  })
)

export const playerJobsValidator = vine.compile(
  vine.object({
    miner: jobValidator.clone(),
    farmer: jobValidator.clone(),
    hunter: jobValidator.clone(),
    alchemist: jobValidator.clone(),
  })
)

export const latestPlayerDataValidator = vine.compile(
  vine.array(
    vine.object({ uuid: vine.string().uuid(), username: vine.string(), date: vine.string() })
  )
)

export const playerWrappedValidator = vine.compile(
  vine.object({
    uuid: vine.string().uuid(),
    username: vine.string(),
    achievements: vine.object({
      completed: vine.number(),
      total: vine.number(),
    }),
    mount: vine
      .object({
        mountType: vine.number(),
        name: vine.string(),
        level: vine.number(),
      })
      .optional(),
    pet: vine
      .object({
        currentSkin: vine.string(),
        level: vine.number(),
      })
      .optional(),
    friends: vine.number(),
    faction: vine.object({
      name: vine.string(),
      alliance: vine.enum(['ORDER', 'CHAOS']).optional(),
      emblemUrl: vine.string().optional(),
    }),
    factionsCount: vine.number(),
    timePlayed: vine.number(),
    /* jobs: vine.object({
      miner: vine.number(),
      farmer: vine.number(),
      hunter: vine.number(),
      alchemist: vine.number(),
    }), */
    moneyMax: vine.number(),
    bestLeaderboard: vine
      .object({
        name: vine.string(),
        value: vine.number(),
      })
      .nullable(),
    clicker: vine.object({
      production: vine.number(),
      rps: vine.number(),
      buildings: vine.object({
        lastUnlocked: vine
          .object({
            name: vine.string(),
            label: vine.string(),
          })
          .optional(),
        unlocked: vine.number(),
        total: vine.number(),
      }),
      upgrades: vine.object({
        unlocked: vine.number(),
        total: vine.number(),
      }),
    }),
  })
)

export const playerSearchResultValidator = vine.compile(
  vine.array(
    vine.object({
      uuid: vine.string().uuid(),
      username: vine.string(),
    })
  )
)
