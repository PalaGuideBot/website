import { Badge, Loading } from '@lemonsqueezy/wedges'
import {
  CirclePlayIcon,
  CirclePowerIcon,
  ConstructionIcon,
  ListXIcon,
  ShieldQuestionIcon,
  TriangleAlertIcon,
} from 'lucide-react'

import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { eachDayOfInterval, eachHourOfDate, formatDate } from '~/lib/date'
import { DateTime } from '~/lib/luxon'
import { cn } from '~/lib/utils'
import { PaladiumStatus } from '~/types'
import { useDateIntervalStore } from '../stores/use_date_interval_store'

type UptimeIndicatorProps = {
  data: Array<{ date: string; status: Array<{ from: string; to: string; status: PaladiumStatus }> }>
}

const TIME_INTERVAL_IN_MINUTES = 10

const UptimeIndicatorStatus = ({ status }: { status: PaladiumStatus }) => {
  const icon = {
    online: (
      <span className="flex h-4 w-4 items-center justify-center rounded-full before:flex before:aspect-square before:w-[6px] before:rounded-full before:bg-wg-green before:content-['']" />
    ),
    offline: (
      <span className="flex h-4 w-4 items-center justify-center rounded-full before:flex before:aspect-square before:w-[6px] before:rounded-full before:bg-destructive before:content-['']" />
    ),
    maintenance: <ConstructionIcon className="h-4 w-4" />,
    running: (
      <span className="flex h-4 w-4 items-center justify-center rounded-full before:flex before:aspect-square before:w-[6px] before:rounded-full before:bg-wg-green before:content-['']" />
    ),
    starting: <CirclePlayIcon className="h-4 w-4" />,
    restarting: <Loading size="xs" type="dots" color="primary" />,
    stopping: <CirclePowerIcon className="h-4 w-4 animate-blink" />,
    unknown: <ShieldQuestionIcon className="h-4 w-4" />,
    whitelist: <ListXIcon className="h-4 w-4" />,
  }[status]

  return (
    <Badge before={icon} size="sm" shape="pill">
      {translateStatus(status)}
    </Badge>
  )
}

const UptimeIndicatorTick = ({
  date,
  status,
}: {
  date: string
  status: UptimeIndicatorProps['data'][number]['status']
}) => {
  const dateInterval = useDateIntervalStore((state) => state.dateInterval)

  const isInactive = status.some((s) => !['online', 'running'].includes(s.status))
  const isFutureDate = DateTime.fromISO(date).diffNow().milliseconds > 0
  const isSameInterval =
    {
      'last-30-days': DateTime.fromISO(date).hasSame(DateTime.now(), 'day'),
      'today': DateTime.fromISO(date).hasSame(DateTime.now(), 'hour'),
    }[dateInterval] ?? false

  if (isFutureDate) {
    return <span className="h-full w-full rounded-sm bg-surface-200 dark:bg-surface-50" />
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'data-[state=open]:outline h-full w-full rounded-sm outline-1 hover:outline',
            isInactive && !isFutureDate ? 'bg-destructive' : 'bg-wg-green',
            status.length === 0 && 'bg-primary',
            isSameInterval && 'outline'
          )}
        />
      </PopoverTrigger>
      <PopoverContent className="min-w-72" side="bottom">
        {status.length > 0 ? (
          <UptimeIndicatorTickTooltipContent date={date} status={status} />
        ) : (
          <UptimeIndicatorTickTooltipEmptyContent date={date} />
        )}
      </PopoverContent>
    </Popover>
  )
}

const UptimeIndicatorTickTooltipContent = ({
  date,
  status,
}: {
  date: string
  status: UptimeIndicatorProps['data'][number]['status']
}) => {
  return (
    <>
      <h4 className="font-pixel text-xs">{formatDate(date, DateTime.DATE_FULL)}</h4>
      <ul className="p-2 text-sm space-y-2">
        {status.toReversed().map((s, index) => {
          const { from, to } = s
          return (
            <li key={[from, to].join('') + index} className="flex gap-2 items-center">
              <UptimeIndicatorStatus status={s.status} />
              <span>{from === to ? from : `de ${from} à ${to}`}</span>
            </li>
          )
        })}
      </ul>
    </>
  )
}

const UptimeIndicatorTickTooltipEmptyContent = ({ date }: { date: string }) => {
  const dateInterval = useDateIntervalStore((state) => state.dateInterval)

  const endDate =
    {
      'last-30-days': DateTime.fromISO(date)
        .plus({ days: 1 })
        .startOf('day')
        .minus({ minutes: TIME_INTERVAL_IN_MINUTES })
        .toISO()!,
      'today': DateTime.fromISO(date)
        .plus({
          hours: 1,
        })
        .minus({ minutes: TIME_INTERVAL_IN_MINUTES })
        .toISO()!,
    }[dateInterval] ?? DateTime.fromISO(date).endOf('day').toISO()!

  return (
    <div className="text-sm space-y-2 p-2">
      <div className="flex flex-row items-center gap-2">
        <TriangleAlertIcon className="size-4" />
        <span>Aucune donnée</span>
      </div>
      <p className="font-bold">Période :</p>
      <p>du {formatDate(date, 'dd/MM/yyyy HH:mm:ss')}</p>
      <p>au {formatDate(endDate, 'dd/MM/yyyy HH:mm:ss')}</p>
    </div>
  )
}

const UptimeIndicator = ({ data }: UptimeIndicatorProps) => {
  const dateInterval = useDateIntervalStore((state) => state.dateInterval)

  const firstDate = data.at(0)?.date ?? DateTime.now().toSQLDate()

  let result: Array<{ date: string; status: UptimeIndicatorProps['data'][number]['status'] }> = []

  switch (dateInterval) {
    case 'today':
      result = eachHourOfDate(firstDate).map((date) => {
        return {
          date: date,
          status:
            data.find((s) =>
              s.status.some((status) =>
                DateTime.fromISO(date).hasSame(DateTime.fromSQL(`${s.date} ${status.from}`), 'hour')
              )
            )?.status ?? [],
        }
      })
      break
    case 'last-30-days':
      result = eachDayOfInterval({
        start: DateTime.now().startOf('day').minus({ days: 29 }),
        end: DateTime.fromISO(firstDate).endOf('day'),
      }).map((date) => {
        return {
          date: date,
          status: data
            .filter((s) => DateTime.fromISO(date).hasSame(DateTime.fromISO(s.date), 'day'))
            .flatMap((s) => s.status),
        }
      })
      break
  }

  return (
    <div className="h-5 bg-surface rounded-md w-full flex flex-row gap-0.5">
      {result.map(({ date, status }, index) => (
        <UptimeIndicatorTick key={date + index} date={date} status={status} />
      ))}
    </div>
  )
}

function translateStatus(status: PaladiumStatus) {
  const translations: Record<PaladiumStatus, string> = {
    online: 'En ligne',
    offline: 'Hors ligne',
    maintenance: 'En maintenance',
    running: 'En ligne',
    starting: 'Démarrage',
    restarting: 'Redémarrage',
    stopping: 'Arrêt',
    unknown: 'Inconnu',
    whitelist: 'Whitelist',
  }

  return translations[status] ?? 'Inconnu'
}

export { UptimeIndicator }
