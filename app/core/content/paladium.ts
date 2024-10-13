import { DateTime } from 'luxon'

const seasons = [
  {
    name: 'v10',
    start: DateTime.fromMillis(1726869600000).startOf('day'),
    end: DateTime.now().endOf('day'),
  },
]

const getCurrentSeason = () => {
  return seasons[0]
}

export { getCurrentSeason, seasons }
