import vine, { VineValidator } from '@vinejs/vine'

import type {
  LeaderboardCategory,
  LeaderboardTrixiumCategory,
} from '#leaderboard/content/categories'

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
        })
      ),
    })
  )
)

const allianceValidator = vine.compile(
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

const jobValidator = vine.compile(
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

export const jobQueryValidator = vine.compile(
  vine.enum(['miner', 'farmer', 'hunter', 'alchemist']).parse((value) => value || 'miner')
)

export const validators = {
  'factions': factionsValidator,
  'boss': bossValidator,
  'chorus': chorusValidator,
  'clicker': clickerValidator,
  'egghunt': egghuntValidator,
  'end': endValidator,
  'koth': kothValidator,
  'money': moneyValidator,
  'alliance': allianceValidator,
  'job.miner': jobValidator,
  'job.farmer': jobValidator,
  'job.hunter': jobValidator,
  'job.alchemist': jobValidator,
} satisfies Record<LeaderboardCategory, VineValidator<any, any>>

export const trixiumValidators = {
  faction: trixiumFactionValidator,
  player: trixiumPlayerValidator,
} satisfies Record<LeaderboardTrixiumCategory, VineValidator<any, any>>
