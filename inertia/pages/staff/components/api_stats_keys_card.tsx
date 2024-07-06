import { Button } from '@lemonsqueezy/wedges'
import { DateTime } from 'luxon'
import { useState } from 'react'
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
import { cn, formatNumber } from '~/lib/utils'

export type ApiStatsKeysCardProps = {
  data: Array<Record<string, { count: number; ip: number } | string>>
  keys: string[]
}

const ApiStatsKeysCard = ({ data, keys }: ApiStatsKeysCardProps) => {
  const [visibleKeys, setVisibleKeys] = useState(
    keys.reduce(
      (acc, key) => {
        acc[key] = true
        return acc
      },
      {} as Record<string, boolean>
    )
  )

  const handleLegendClick = (key: string) => {
    key = key.replace('.count', '')
    setVisibleKeys({
      ...visibleKeys,
      [key]: !visibleKeys[key],
    })
  }

  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#A633FF', '#33FFF0']

  return (
    <Card className="bg-backgroud">
      <CardHeader className="border-b">
        <CardTitle>Statistiques: Clés API</CardTitle>
      </CardHeader>
      <CardContent className="p-4 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis dataKey="date" className="text-xs" />
            <YAxis
              className="text-xs"
              tickFormatter={(value) => formatNumber(Number(value))}
              orientation="right"
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="bg-background/95">
                      <CardContent className="p-4 space-y-2">
                        <div className="font-pixel text-xs">
                          {formatDate(label, DateTime.DATE_MED)}
                        </div>
                        <div className="flex flex-col gap-2">
                          {payload
                            .toSorted((a, b) => Number(b.value) - Number(a.value))
                            .map(({ name, payload: raw }) => {
                              const target = raw[String(name)] as { count: number; ip: number }
                              return (
                                <div key={name} className="flex gap-2 items-center">
                                  <span className="text-sm">{name}</span>
                                  <p>
                                    <span className="text-sm font-bold">
                                      {formatNumber(Number(target.count), {
                                        notation: 'standard',
                                        maximumFractionDigits: 2,
                                      })}
                                    </span>{' '}
                                    <span className="text-xs">{`(${target.ip} ip)`}</span>
                                  </p>
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
                  className={cn('text-inherit p-0.5', !visibleKeys[value] && 'line-through')}
                >
                  {value}
                </Button>
              )}
              onClick={(e) => handleLegendClick(String(e.dataKey))}
            />
            {keys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={`${key}.count`}
                name={key}
                hide={!visibleKeys[key]}
                stroke={colors[index] ?? 'hsl(var(--wg-primary))'}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export { ApiStatsKeysCard }
