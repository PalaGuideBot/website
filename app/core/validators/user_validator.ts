import vine from '@vinejs/vine'

export const userInfoValidator = vine.compile(
  vine.object({
    _id: vine.string(),
    uuid: vine.string().uuid(),
    username: vine.string(),
    data: vine.array(
      vine.object({
        data: vine.object({
          jobs: vine.record(
            vine.object({
              level: vine.number(),
              xp: vine.number(),
            })
          ),
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
