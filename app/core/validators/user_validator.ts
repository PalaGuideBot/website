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
  corruption: vine.number(),
  clicker: vine.number(),
  trixium: vine.number(),
  job_miner: vine.number(),
  job_farmer: vine.number(),
  job_hunter: vine.number(),
  job_alchemist: vine.number(),
})

export const userInfoValidator = vine.compile(
  vine.object({
    _id: vine.string(),
    uuid: vine.string().uuid(),
    username: vine.string(),
    firstJoin: vine.number(),
    leaderboard: leaderboardValidator,
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
          money: vine.number(),
          rank: vine.string(),
          timePlayed: vine.number(),
        }),
        date: vine.string(),
        _id: vine.string(),
      })
    ),
  })
)
