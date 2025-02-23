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

import { ChartContainer, useChart } from '~/components/shared/chart_container'
import { ChartControls } from '~/components/shared/chart_controls'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { formatDate } from '~/lib/date'
import { DateTime } from '~/lib/luxon'
import { formatNumber } from '~/lib/utils'

export type DiscordInteractionsCardProps = {
  data: Array<Record<string, string | number>>
  interactions: string[]
}

const DiscordInteractionsCard = ({ data, interactions }: DiscordInteractionsCardProps) => {
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
    '#C70039',
    '#900C3F',
    '#FF5733',
    '#FFBD33',
    '#75FF33',
    '#33FFBD',
    '#3375FF',
    '#FF336E',
  ]

  const initialSeries = interactions.map((interaction, index) => ({
    id: interaction,
    name: interaction,
    color: colors[index] ?? 'hsl(var(--wg-primary))',
  }))

  return (
    <ChartContainer initialSeries={initialSeries}>
      <Card className="bg-background">
        <CardHeader className="space-y-0 py-2 border-b flex flex-row items-center justify-between gap-4">
          <CardTitle>Intéractions</CardTitle>
          <ChartControls />
        </CardHeader>
        <CardContent className="p-4 min-h-96">
          <Chart data={data} />
        </CardContent>
      </Card>
    </ChartContainer>
  )
}

const Chart = ({ data }: { data: any[] }) => {
  const { visibleSeries } = useChart()

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data.filter((cmd) => {
          return Object.values(cmd).some((value) => Number(value) > 0)
        })}
      >
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
                        .map(({ name, value, stroke }) => {
                          return (
                            <div key={name} className="flex gap-2 items-center">
                              <span
                                className="h-3 w-3 rounded-sm"
                                style={{ backgroundColor: stroke }}
                              />
                              <span className="text-sm">{name}</span>
                              <span className="text-sm font-bold">
                                {formatNumber(Number(value), {
                                  notation: 'standard',
                                  maximumFractionDigits: 2,
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
          formatter={(value, entry) => {
            return (
              <span className="px-1" style={{ color: entry.color }}>
                {value}
              </span>
            )
          }}
        />
        {visibleSeries.map((serie) => (
          <Line
            key={serie.id}
            type="monotone"
            dataKey={serie.id}
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

export { DiscordInteractionsCard }
