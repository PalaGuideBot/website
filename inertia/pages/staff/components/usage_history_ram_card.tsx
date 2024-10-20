import { Button } from '@lemonsqueezy/wedges'
import { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { formatDate } from '~/lib/date'
import { DateTime } from '~/lib/luxon'
import { cn, formatNumber } from '~/lib/utils'

export type UsageHistoryRamCardProps = {
  data: Array<Record<string, string>>
  services: string[]
}

const UsageHistoryRamCard = ({ data, services }: UsageHistoryRamCardProps) => {
  const [visibleServices, setVisibleServices] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setVisibleServices((prev) => ({
      ...prev,
      ...services.reduce(
        (acc, service) => {
          if (service in visibleServices === false) {
            acc[service] = true
          }
          return acc
        },
        {} as Record<string, boolean>
      ),
    }))
  }, [services])

  const handleLegendClick = (service: string) => {
    setVisibleServices({
      ...visibleServices,
      [service]: !visibleServices[service],
    })
  }

  const colors = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#FF33A6',
    '#A633FF',
    '#33FFF0',
    '#FFC300',
    '#DAF7A6',
    '#581845',
  ]

  return (
    <Card className="bg-backgroud">
      <CardHeader className="border-b">
        <CardTitle>Historique: RAM</CardTitle>
      </CardHeader>
      <CardContent className="p-4 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis
              dataKey="date"
              className="text-xs"
              tickFormatter={(value) => formatDate(value, DateTime.TIME_WITH_SECONDS)}
            />
            <YAxis
              className="text-xs"
              tickFormatter={(value) =>
                formatNumber(Number(value), {
                  notation: 'standard',
                  maximumFractionDigits: 0,
                  unit: 'megabyte',
                  style: 'unit',
                })
              }
              orientation="right"
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="bg-background/95">
                      <CardContent className="p-4 space-y-2">
                        <div className="font-pixel text-xs">{formatDate(label)}</div>
                        <div className="flex flex-col gap-2">
                          {payload
                            .toSorted((a, b) => Number(b.value) - Number(a.value))
                            .map(({ name, value }) => {
                              return (
                                <div key={name} className="flex gap-2 items-center">
                                  <span className="text-sm">{name}</span>
                                  <span className="text-sm font-bold">
                                    {formatNumber(Number(value), {
                                      notation: 'standard',
                                      maximumFractionDigits: 2,
                                      unit: 'megabyte',
                                      style: 'unit',
                                    })}
                                  </span>
                                </div>
                              )
                            })}
                        </div>
                      </CardContent>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Legend
              formatter={(value) => (
                <Button
                  type="button"
                  variant="transparent"
                  size="sm"
                  className={cn('text-inherit p-0.5', !visibleServices[value] && 'line-through')}
                >
                  {value}
                </Button>
              )}
              onClick={(e) => handleLegendClick(String(e.dataKey))}
            />
            {services.map((service, index) => (
              <Line
                key={service}
                type="monotone"
                dataKey={service}
                name={service}
                hide={!visibleServices[service]}
                stroke={colors[index] ?? 'hsl(var(--wg-primary))'}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export { UsageHistoryRamCard }
