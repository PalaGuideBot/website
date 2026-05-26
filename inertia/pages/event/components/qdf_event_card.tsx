import { Infer } from '@vinejs/vine/types'
import { HourglassIcon } from 'lucide-react'
import * as React from 'react'

import type { eventFactionQuestValidator } from '#event/validators/event_validator'
import { MoneyIcon, QuestionIcon, XpIcon } from '~/components/icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { useDateCountdown } from '~/hooks/use_date_countdown'
import { cn, formatNumber, formatPrice } from '~/lib/utils'

interface QDFEventCardProps extends React.ComponentProps<typeof Card> {
  event: Infer<typeof eventFactionQuestValidator> | null
}

const QDFEventCard = ({ event, className, ...props }: QDFEventCardProps) => {
  if (!event) {
    return (
      <Card className={cn('gap-4', className)} {...props}>
        <CardHeader className="flex-col border-b">
          <CardTitle>Quête de faction</CardTitle>
          <CardDescription className="text-destructive">
            La quête de faction n'est pas disponible pour le moment. Les autres événements restent
            accessibles.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center justify-center size-24 rounded-full bg-primary-500/20">
              <QuestionIcon className="size-6 invert dark:invert-0" />
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <HourglassIcon className="size-6 text-primary-300" />
            <Skeleton className="h-8 w-24" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-evenly items-center gap-4 border-t">
          <div className="flex items-center space-x-2">
            <MoneyIcon className="size-6 text-emerald-500" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center space-x-2">
            <XpIcon className="size-6" />
            <Skeleton className="h-4 w-20" />
          </div>
        </CardFooter>
      </Card>
    )
  }

  const [countdown] = useDateCountdown({
    countStart: event.start * 1000,
    countStop: event.end * 1000,
  })

  return (
    <Card className={cn('gap-4', className)} {...props}>
      <CardHeader className="flex-col border-b">
        <CardTitle>Quête de faction</CardTitle>
        <CardDescription>
          Effectuez la quête de faction en jeu pour que votre faction reçoive les récompenses
          ci-dessous.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center justify-center size-24 rounded-full bg-primary-500/20">
            {!event.image && <QuestionIcon className="size-6 invert dark:invert-0" />}
            {event.image && (
              <img src={event.image.url} className="object-contain aspect-square w-12" />
            )}
          </div>
          <h3 className="text-center font-mc-dungueons mb-1">
            <span className="text-primary-300">
              {formatNumber(event.quantity, { notation: 'standard' })}
            </span>{' '}
            <span>{event.image ? event.image.name : event.item}</span>
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <HourglassIcon className="size-6 text-primary-300" />
          <span className="text-lg sm:text-2xl font-bold tabular-nums" suppressHydrationWarning>
            {countdown}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-evenly items-center gap-4 border-t">
        <div className="flex items-center space-x-2">
          <MoneyIcon className="size-6 text-emerald-500" />
          <span className="text-sm font-mc-dungueons">
            +{formatPrice(event.earningMoney, { notation: 'compact' })}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <XpIcon className="size-6" />
          <span className="text-sm font-mc-dungueons">+{formatNumber(event.earningXp)} XP</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export { QDFEventCard }
