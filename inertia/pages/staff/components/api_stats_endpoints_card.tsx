import { Button, ToggleGroup } from '@lemonsqueezy/wedges'
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
import { DateTime } from '~/lib/luxon'
import { cn, formatNumber } from '~/lib/utils'

export type ApiStatsEndpointsCardProps = {
  data: Array<
    Record<
      string,
      { count: number; averageTime: number; maxTime: number; minTime: number } | string
    >
  >
  endpoints: string[]
}

const ApiStatsEndpointsCard = ({ data, endpoints }: ApiStatsEndpointsCardProps) => {
  const [graphType, setGraphType] = useState<'count' | 'averageTime'>('count')

  const [visibleEndpoints, setVisibleEndpoints] = useState(
    endpoints.reduce(
      (acc, endpoint) => {
        acc[endpoint] = true
        return acc
      },
      {} as Record<string, boolean>
    )
  )

  const handleLegendClick = (key: string) => {
    key = key.replace(`.${graphType}`, '')
    setVisibleEndpoints({
      ...visibleEndpoints,
      [key]: !visibleEndpoints[key],
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
    '#c586c0',
    '#75FF33',
    '#33A1FF',
    '#FF336E',
    '#8D33FF',
    '#33FFD6',
    '#FFD700',
    '#B3FF99',
    '#3D1E56',
    '#EAD1DC',
    '#FF6F61',
    '#4CFF33',
    '#3380FF',
    '#FF33C4',
    '#9B33FF',
    '#33FFE0',
    '#FFD966',
    '#B2FF66',
    '#4A235A',
    '#FFB3C6',
    '#FF914D',
  ]

  return (
    <Card className="bg-backgroud">
      <CardHeader className="border-b flex flex-row items-center justify-between py-2">
        <CardTitle>Statistiques: Endpoints</CardTitle>
        <ToggleGroup
          type="single"
          value={graphType}
          onValueChange={(value) => {
            if (value.length) {
              setGraphType(value as 'count' | 'averageTime')
            }
          }}
          size="sm"
          className="!m-0"
        >
          <ToggleGroup.Item value="count">Count</ToggleGroup.Item>
          <ToggleGroup.Item value="averageTime">AVG Time</ToggleGroup.Item>
        </ToggleGroup>
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
                              const target = raw[String(name)] as {
                                count: number
                                averageTime: number
                                maxTime: number
                                minTime: number
                              }
                              return (
                                <div key={name} className="flex gap-2 items-center">
                                  <span className="text-sm">{name}</span>
                                  <p>
                                    <span className="text-sm font-bold">
                                      {formatNumber(Number(target[graphType]), {
                                        notation: 'standard',
                                        maximumFractionDigits: 2,
                                        unit:
                                          graphType === 'averageTime' ? 'millisecond' : undefined,
                                        style: graphType === 'averageTime' ? 'unit' : undefined,
                                      })}
                                    </span>
                                    {graphType === 'averageTime' && (
                                      <span className="text-xs">
                                        {' '}
                                        (
                                        {`min: ${formatNumber(Number(target.minTime), {
                                          notation: 'standard',
                                          maximumFractionDigits: 2,
                                          unit: 'millisecond',
                                          style: 'unit',
                                        })}`}
                                        ,
                                        {` max: ${formatNumber(Number(target.maxTime), {
                                          notation: 'standard',
                                          maximumFractionDigits: 2,
                                          unit: 'millisecond',
                                          style: 'unit',
                                        })}`}
                                        )
                                      </span>
                                    )}
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
                  className={cn('text-inherit p-0.5', !visibleEndpoints[value] && 'line-through')}
                >
                  {value}
                </Button>
              )}
              onClick={(payload) => handleLegendClick(payload.value)}
            />
            {endpoints.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={(item) => item[key][graphType]}
                name={key}
                hide={!visibleEndpoints[key]}
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

export { ApiStatsEndpointsCard }
