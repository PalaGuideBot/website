import vine from '@vinejs/vine'

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
  damage: vine.number(),
  food: vine.number(),
  sharedXpPercent: vine.number(),
  xp: vine.number(),
})

const petValidator = vine.object({
  currentSkin: vine.string(),
  happiness: vine.number(),
  skills: vine.array(
    vine.object({
      id: vine.string(),
      lastChange: vine.number(),
      nextUse: vine.number(),
    })
  ),
})

export const playerInfoValidator = vine.compile(
  vine.object({
    uuid: vine.string().uuid(),
    username: vine.string(),
    firstJoin: vine.number(),
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
  })
)
