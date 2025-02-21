import { DateTime } from '~/lib/luxon'

export const PALADIUM_OPTIONS = {
  MIN_JOB_LEVEL: 1,
  MAX_JOB_LEVEL: 100,
  MIN_POG_LEVEL: 1,
  MAX_POG_LEVEL: 100,
}

export function getSeasonStart() {
  return DateTime.fromMillis(1740092400000)
}
