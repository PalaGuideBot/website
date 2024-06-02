import { Badge, Loading, Tooltip } from '@lemonsqueezy/wedges'
import {
  addDays,
  addHours,
  addMinutes,
  eachDayOfInterval,
  endOfDay,
  isFuture,
  isSameDay,
  isSameHour,
  isToday,
  nextDay,
  startOfDay,
} from 'date-fns'
import { CirclePlayIcon, CirclePowerIcon, ConstructionIcon, TriangleAlertIcon } from 'lucide-react'
import { eachHourOfDate, formatDate } from '~/lib/date'
import { cn } from '~/lib/utils'
import { PaladiumStatus } from '~/types'
import { useDateIntervalStore } from '../stores/use_date_interval_store'

type UptimeIndicatorProps = {
  data: Array<{ date: string; status: PaladiumStatus }>
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
    stopping: <CirclePowerIcon className="h-4 w-4" />,
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
  status: UptimeIndicatorProps['data']
}) => {
  const dateInterval = useDateIntervalStore((state) => state.dateInterval)

  const isInactive = status.some((s) => !['online', 'running'].includes(s.status))
  const isFutureDate = isFuture(date)
  const isSameInterval =
    {
      'last-30-days': isToday(date),
      'today': isSameHour(date, new Date()),
    }[dateInterval] ?? false

  if (isFutureDate) {
    return <span className="h-full w-full rounded-sm bg-surface-50" />
  }

  return (
    <Tooltip.Provider delayDuration={0} skipDelayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <span
            className={cn(
              'h-full w-full rounded-sm outline-1 hover:outline',
              isInactive && !isFutureDate ? 'bg-destructive' : 'bg-wg-green',
              status.length === 0 && 'bg-primary',
              isSameInterval && 'outline'
            )}
          />
        </Tooltip.Trigger>
        <Tooltip.Content content={null} arrow={false} sideOffset={8} color="soft" side="bottom">
          {status.length > 0 ? (
            <UptimeIndicatorTickTooltipContent statusMap={status} />
          ) : (
            <UptimeIndicatorTickTooltipEmptyContent date={date} />
          )}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

const UptimeIndicatorTickTooltipContent = ({
  statusMap,
}: {
  statusMap: UptimeIndicatorProps['data']
}) => {
  const historyStatus = statusMap.reduce(
    (history: { period: string; status: PaladiumStatus }[], data) => {
      const { date, status } = {
        date: data.date,
        status: data.status,
      }

      const lastHistory = history[history.length - 1]

      if (!lastHistory || lastHistory.status !== status) {
        history.push({
          period: `${formatDate(date)} au ${formatDate(date)}`,
          status,
        })
      } else {
        lastHistory.period = `${formatDate(date)} au ${lastHistory.period.split(' au ')[1]}`
      }

      return history
    },
    []
  )

  return (
    <ul className="p-2 text-sm space-y-2 list-disc list-inside">
      {historyStatus.map((s, index) => (
        <li key={s.period + index}>
          {s.period} - <UptimeIndicatorStatus status={s.status} />
        </li>
      ))}
    </ul>
  )
}

const UptimeIndicatorTickTooltipEmptyContent = ({ date }: { date: string }) => {
  const dateInterval = useDateIntervalStore((state) => state.dateInterval)

  const endDate =
    {
      'last-30-days': addMinutes(nextDay(date, 0), -TIME_INTERVAL_IN_MINUTES),
      'today': addMinutes(addHours(date, 1), -TIME_INTERVAL_IN_MINUTES),
    }[dateInterval] ?? endOfDay(date)

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

  let result: Array<{ date: string; status: UptimeIndicatorProps['data'] }> = []

  switch (dateInterval) {
    case 'today':
      result = eachHourOfDate(new Date()).map((date) => {
        return {
          date: date.toISOString(),
          status: data.filter((s) => isSameHour(date, s.date)),
        }
      })
      break
    case 'last-30-days':
      result = eachDayOfInterval({
        start: addDays(startOfDay(new Date()), -29),
        end: endOfDay(data[data.length - 1].date),
      }).map((date) => {
        return {
          date: date.toISOString(),
          status: data.filter((s) => isSameDay(date, new Date(s.date))),
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
  }

  return translations[status] ?? 'Inconnu'
}

export { UptimeIndicator }
