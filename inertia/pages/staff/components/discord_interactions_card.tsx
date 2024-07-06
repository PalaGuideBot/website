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
import LinearGradient from '~/components/shared/linear_gradient'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { graphColors } from '~/content/leaderboards'
import { formatDate } from '~/lib/date'
import { cn, formatNumber } from '~/lib/utils'

export type DiscordInteractionsCardProps = {
  data: Array<Record<string, string | number>>
  interactions: string[]
}

const DiscordInteractionsCard = ({ data, interactions }: DiscordInteractionsCardProps) => {
  const [visibleInteractions, setVisibleInteractions] = useState(
    interactions.reduce(
      (acc, interaction) => {
        acc[interaction] = true
        return acc
      },
      {} as Record<string, boolean>
    )
  )

  const handleLegendClick = (interaction: string) => {
    setVisibleInteractions({
      ...visibleInteractions,
      [interaction]: !visibleInteractions[interaction],
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
    '#C70039',
    '#900C3F',
    '#FF5733',
    '#FFBD33',
    '#75FF33',
    '#33FFBD',
    '#3375FF',
  ]

  return (
    <Card className="bg-backgroud">
      <CardHeader className="border-b">
        <CardTitle>Intéractions</CardTitle>
      </CardHeader>
      <CardContent className="p-4 h-96">
        <ResponsiveContainer width="100%" height="100%">
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
                        <div className="font-pixel text-xs">
                          {formatDate(label, DateTime.DATE_MED)}
                        </div>
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
                  className={cn(
                    'text-inherit p-0.5',
                    !visibleInteractions[value] && 'line-through'
                  )}
                >
                  {value}
                </Button>
              )}
              onClick={(e) => handleLegendClick(String(e.dataKey))}
            />
            {Array.from(interactions).map((interaction, index) => (
              <Line
                key={interaction}
                type="monotone"
                dataKey={interaction}
                name={interaction}
                hide={!visibleInteractions[interaction]}
                stroke={colors[index] ?? 'hsl(var(--wg-primary))'}
                strokeWidth={2}
                dot={false}
              />
            ))}
            <defs>
              <LinearGradient id="guilds-gradient" from={graphColors[3]} />
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export { DiscordInteractionsCard }
