import * as React from 'react'
import { useCountdown } from 'usehooks-ts'

import { DateTime } from '~/lib/luxon'

type UseDateCountdownOptions = {
  countStop: number
  countStart: number
  format?: string
  initialStart?: boolean
  endMessage?: string
}

type UseDateCountdownResult = [string, { startCountdown: () => void; stopCountdown: () => void }]

export function useDateCountdown(options: UseDateCountdownOptions): UseDateCountdownResult {
  const {
    countStop,
    countStart,
    format = "d'j' h'h' m'm' ss's'",
    initialStart = true,
    endMessage = 'Terminé !',
  } = options

  const [currentCountdown, { startCountdown, stopCountdown }] = useCountdown({
    countStart,
    countStop,
  })

  const difference = React.useMemo(
    () =>
      DateTime.fromMillis(countStop).diff(
        DateTime.now().plus({ milliseconds: countStart - currentCountdown })
      ),
    [countStop, countStart, currentCountdown]
  )

  const isEnd = difference.as('milliseconds') <= 0

  React.useEffect(() => {
    if (initialStart && !isEnd) {
      startCountdown()
    }

    return () => {
      stopCountdown()
    }
  }, [initialStart, isEnd, startCountdown, stopCountdown])

  React.useEffect(() => {
    if (isEnd) {
      stopCountdown()
    }
  }, [isEnd, stopCountdown])

  const value = isEnd ? endMessage : difference.toFormat(format)

  return [value, { startCountdown, stopCountdown }]
}
