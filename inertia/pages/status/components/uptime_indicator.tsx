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
    stopping: <CirclePowerIcon className="h-4 w-4 animate-blink" />,
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
        <Tooltip.Content
          className="min-w-72"
          content={null}
          arrow={false}
          sideOffset={8}
          color="soft"
          side="bottom"
        >
          {status.length > 0 ? (
            <UptimeIndicatorTickTooltipContent status={status} />
          ) : (
            <UptimeIndicatorTickTooltipEmptyContent date={date} />
          )}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

const UptimeIndicatorTickTooltipContent = ({
  status,
}: {
  status: UptimeIndicatorProps['data']
}) => {
  const historyStatus = status.reduce(
    (history, data) => {
      const { date, status: s } = data

      const lastHistory = history[history.length - 1]
      const formattedDate = formatDate(date, 'p')

      if (!lastHistory || lastHistory.status !== s) {
        history.push({
          period: [formattedDate, formattedDate],
          status: s,
        })
      } else {
        const [, to] = lastHistory.period
        lastHistory.period = [to, formattedDate]
      }

      return history
    },
    [] as Array<{ period: [string, string]; status: PaladiumStatus }>
  )

  return (
    <>
      <h4 className="font-pixel text-xs">{formatDate(status[0].date, 'PP')}</h4>
      <ul className="p-2 text-sm space-y-2">
        {historyStatus.map((s, index) => {
          const [from, to] = s.period
          return (
            <li key={s.period.join('') + index} className="flex gap-2 items-center">
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
          date: formatDate(date, 'yyyy-MM-dd HH:mm:ss'),
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
          date: formatDate(date, 'yyyy-MM-dd HH:mm:ss'),
          status: data.filter((s) => isSameDay(date, s.date)),
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
