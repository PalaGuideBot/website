import { DateTime } from 'luxon'

const getSeasons = () => {
  return [
    {
      name: 'v10',
      start: DateTime.fromMillis(1726869600000).startOf('day'),
      end: DateTime.now().endOf('day'),
    },
  ]
}

const getCurrentSeason = () => {
  return getSeasons()[0]
}

export { getCurrentSeason, getSeasons }
