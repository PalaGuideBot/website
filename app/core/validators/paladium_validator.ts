import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

const season = vine.object({
  start: vine.string().transform((value) => DateTime.fromISO(value) as DateTime<true>),
  end: vine.string().transform((value) => DateTime.fromISO(value) as DateTime<true>),
})

export const paladiumSeasonValidator = vine.compile(
  vine.object({
    current: vine.string(),
    seasons: vine.record(season.clone()),
  })
)
