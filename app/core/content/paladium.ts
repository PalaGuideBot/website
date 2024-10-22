import { DateTime } from 'luxon'

const getCurrentSeason = () => {
  return {
    start: DateTime.fromMillis(1726869600000).startOf('day'),
    end: DateTime.now().endOf('day'),
  }
}

export { getCurrentSeason }
