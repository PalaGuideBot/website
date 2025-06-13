import { Infer } from '@vinejs/vine/types'
import { HourglassIcon } from 'lucide-react'
import * as React from 'react'

import type { eventFactionOnYourMarksValidator } from '#event/validators/event_validator'
import { EloIcon, QuestionIcon } from '~/components/icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { translateOnYourMarksGoalType, translateOnYourMarksServerType } from '~/content/events'
import { useDateCountdown } from '~/hooks/use_date_countdown'
import { formatDate } from '~/lib/date'
import { DateTime } from '~/lib/luxon'
import { formatNumber } from '~/lib/utils'

interface OnYourMarksEventCardProps extends React.ComponentProps<typeof Card> {
  event: Infer<typeof eventFactionOnYourMarksValidator>
}

const OnYourMarksEventCard = ({ event, ...props }: OnYourMarksEventCardProps) => {
  const [countdown] = useDateCountdown({
    countStart: event.start * 1000,
    countStop: event.end * 1000,
    initialStart: event.state === 'RUNNING',
  })

  return (
    <Card {...props}>
      <CardHeader className="border-b flex-row justify-between items-center space-y-0">
        <div className="flex flex-col space-y-1.5">
          <CardTitle>&Agrave; vos marques</CardTitle>
          <CardDescription>
            Remplissez l'objectif en jeu pour faire gagner de l'ELO à votre faction.
          </CardDescription>
        </div>
        <p className="font-mc-dungueons text-sm">
          {translateOnYourMarksServerType(event.serverType)}
        </p>
      </CardHeader>
      <CardContent className="pt-4 flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center justify-center size-24 rounded-full bg-primary-500/20">
            {!event.image && <QuestionIcon className="size-6 invert dark:invert-0" />}
            {event.image && (
              <img src={event.image.url} className="object-contain aspect-square w-12" />
            )}
          </div>
          <div className="flex flex-col text-center sm:text-left">
            <h3 className="font-pixel">{translateOnYourMarksGoalType(event.goalType)}</h3>
            <h3 className="font-mc-dungueons mb-1">
              <span className="text-primary-300">
                {formatNumber(event.amount, { notation: 'standard' })}
              </span>
              {event.goalType === 'WALK' && <span> Blocks</span>}
              {event.extra && <span> {event.image ? event.image.name : event.extra}</span>}
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <HourglassIcon className="size-6 text-primary-300" />
          {event.state === 'RUNNING' ? (
            <span className="text-lg sm:text-2xl font-bold tabular-nums" suppressHydrationWarning>
              {countdown}
            </span>
          ) : (
            <span className="font-bold">
              Démarre le {formatDate(DateTime.fromMillis(event.start * 1000).toISO()!)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center items-center gap-4 pt-4 border-t">
        <div className="flex items-center space-x-2">
          <EloIcon className="size-6 text-emerald-500" />
          <span className="text-sm font-mc-dungueons">
            +{formatNumber(event.rewardElo, { notation: 'standard' })} ELO
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}

export { OnYourMarksEventCard }
