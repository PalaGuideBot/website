import vine, { VineValidator } from '@vinejs/vine'
import type { LeaderboardCategory } from '#leaderboard/content/categories'

const factionsValidator = vine.compile(
  vine.array(
    vine.object({
      date: vine.string(),
      data: vine.array(
        vine.object({
          name: vine.string(),
          value: vine.number(),
          emblemUrl: vine.string().optional(),
        })
      ),
    })
  )
)

const bossValidator = vine.compile(
  vine.array(
    vine.object({
      date: vine.string(),
      data: vine.array(
        vine.object({
          username: vine.string(),
          value: vine.number(),
        })
      ),
    })
  )
)

const chorusValidator = vine.compile(
  vine.array(
    vine.object({
      date: vine.string(),
      data: vine.array(
        vine.object({
          username: vine.string(),
          value: vine.number(),
        })
      ),
    })
  )
)

const clickerValidator = vine.compile(
  vine.array(
    vine.object({
      date: vine.string(),
      data: vine.array(
        vine.object({
          username: vine.string(),
          value: vine.number(),
        })
      ),
    })
  )
)

const egghuntValidator = vine.compile(
  vine.array(
    vine.object({
      date: vine.string(),
      data: vine.array(
        vine.object({
          username: vine.string(),
          value: vine.number(),
        })
      ),
    })
  )
)

const endValidator = vine.compile(
  vine.array(
    vine.object({
      date: vine.string(),
      data: vine.array(
        vine.object({
          username: vine.string(),
          value: vine.number(),
        })
      ),
    })
  )
)

const kothValidator = vine.compile(
  vine.array(
    vine.object({
      date: vine.string(),
      data: vine.array(
        vine.object({
          username: vine.string(),
          value: vine.number(),
        })
      ),
    })
  )
)

const moneyValidator = vine.compile(
  vine.array(
    vine.object({
      date: vine.string(),
      data: vine.array(
        vine.object({
          username: vine.string(),
          value: vine.number(),
        })
      ),
    })
  )
)

const trixiumFactionValidator = vine.array(
  vine.object({
    date: vine.string(),
    data: vine.array(
      vine.object({
        uuid: vine.string().uuid(),
        value: vine.number(),
        emblemUrl: vine.string().optional(),
        name: vine.string().optional(),
      })
    ),
  })
)

const trixiumPlayerValidator = vine.array(
  vine.object({
    date: vine.string(),
    data: vine.array(
      vine.object({
        username: vine.string(),
        value: vine.number(),
      })
    ),
  })
)

export const validators = {
  factions: factionsValidator,
  boss: bossValidator,
  chorus: chorusValidator,
  clicker: clickerValidator,
  egghunt: egghuntValidator,
  end: endValidator,
  koth: kothValidator,
  money: moneyValidator,
  trixfaction: vine.compile(trixiumFactionValidator.clone()),
  trixuser: vine.compile(trixiumPlayerValidator.clone()),
  trixium: vine.compile(
    vine.object({
      faction: trixiumFactionValidator.clone(),
      user: trixiumPlayerValidator.clone(),
    })
  ),
} satisfies Record<LeaderboardCategory, VineValidator<any, any>>
