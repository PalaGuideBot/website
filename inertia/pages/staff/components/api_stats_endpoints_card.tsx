import { ToggleGroup } from '@lemonsqueezy/wedges'
import { useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { ChartContainer, useChart } from '~/components/shared/chart_container'
import { ChartControls } from '~/components/shared/chart_controls'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { formatDate } from '~/lib/date'
import { DateTime } from '~/lib/luxon'
import { formatNumber } from '~/lib/utils'

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
    '#1E90FF',
    '#FF4500',
    '#32CD32',
    '#8B008B',
    '#FFDAB9',
    '#00CED1',
    '#FF1493',
    '#ADFF2F',
    '#DC143C',
    '#20B2AA',
    '#FF6347',
    '#7B68EE',
    '#40E0D0',
    '#FF8C00',
  ]

  const initialSeries = endpoints.map((endpoint, index) => ({
    id: endpoint,
    name: endpoint,
    color: colors[index] ?? 'hsl(var(--wg-primary))',
  }))

  return (
    <ChartContainer initialSeries={initialSeries}>
      <Card className="bg-backgroud">
        <CardHeader className="space-y-0 border-b flex flex-wrap flex-row items-center justify-between gap-4 py-2">
          <CardTitle>Statistiques: Endpoints</CardTitle>
          <div className="flex flex-row items-center gap-2">
            <ToggleGroup
              type="single"
              value={graphType}
              onValueChange={(value) => {
                if (value.length) {
                  setGraphType(value as 'count' | 'averageTime')
                }
              }}
              size="sm"
            >
              <ToggleGroup.Item value="count">Count</ToggleGroup.Item>
              <ToggleGroup.Item value="averageTime">AVG Time</ToggleGroup.Item>
            </ToggleGroup>
            <ChartControls />
          </div>
        </CardHeader>
        <CardContent className="p-4 h-96">
          <Chart data={data} graphType={graphType} />
        </CardContent>
      </Card>
    </ChartContainer>
  )
}

const Chart = ({ data, graphType }: { data: any[]; graphType: 'count' | 'averageTime' }) => {
  const { visibleSeries } = useChart()
  return (
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
                    <div className="font-pixel text-xs">{formatDate(label, DateTime.DATE_MED)}</div>
                    <div className="flex flex-col gap-2">
                      {payload
                        .toSorted((a, b) => Number(b.value) - Number(a.value))
                        .map(({ name, payload: raw, stroke }) => {
                          const target = raw[String(name)] as {
                            count: number
                            averageTime: number
                            maxTime: number
                            minTime: number
                          }
                          return (
                            <div key={name} className="flex gap-2 items-center">
                              <span
                                className="h-3 w-3 rounded-sm"
                                style={{ backgroundColor: stroke }}
                              />
                              <span className="text-sm">{name}</span>
                              <p>
                                <span className="text-sm font-bold">
                                  {formatNumber(Number(target[graphType]), {
                                    notation: 'standard',
                                    maximumFractionDigits: 2,
                                    unit: graphType === 'averageTime' ? 'millisecond' : undefined,
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
        {visibleSeries.map((serie) => (
          <Line
            key={serie.id}
            type="monotone"
            dataKey={(item) => item[serie.id][graphType]}
            name={serie.name}
            stroke={serie.color}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export { ApiStatsEndpointsCard }
