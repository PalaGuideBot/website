import { DateTime } from '~/lib/luxon'

export const PALADIUM_OPTIONS = {
  MIN_JOB_LEVEL: 1,
  MAX_JOB_LEVEL: 100,
}

export function getSeasonStart() {
  return DateTime.fromMillis(1726869600000)
}

export const seasons = [
  {
    name: 'v10',
    start: getSeasonStart().startOf('day'),
    end: DateTime.now().endOf('day'),
  },
]
