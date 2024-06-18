import vine, { VineValidator } from '@vinejs/vine'
import type { LeaderboardCategory } from '#leaderboard/content/categories'

const factionsValidator = vine.compile(
  vine.array(
    vine.object({
      _id: vine.string(),
      date: vine.string(),
      data: vine.array(
        vine.object({
          name: vine.string(),
          value: vine.number(),
          _id: vine.string(),
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

const trixiumFactionValidator = vine.compile(
  vine.array(
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
)

const trixiumPlayerValidator = vine.compile(
  vine.array(
    vine.object({
      date: vine.string(),
      data: vine.array(
        vine.object({
          username: vine.string(),
          value: vine.number(),
          _id: vine.string(),
        })
      ),
    })
  )
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
  trixfaction: trixiumFactionValidator,
  trixuser: trixiumPlayerValidator,
} satisfies Record<LeaderboardCategory, VineValidator<any, any>>
