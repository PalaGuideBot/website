import { Button } from '@lemonsqueezy/wedges'
import { useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
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

export type ApiDatabaseEvolutionCardProps = { data: Array<Record<string, string | number>> }

const ApiDatabaseEvolutionCard = ({ data }: ApiDatabaseEvolutionCardProps) => {
  const translations = {
    'Joueurs uniques': 'uniquePlayerInDataBase',
    'Factions uniques': 'uniqueFactionInDataBase',
  }

  const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>({
    uniquePlayerInDataBase: true,
    uniqueFactionInDataBase: true,
  })

  const handleLegendClick = (dataKey: string) => {
    setVisibleLines({
      ...visibleLines,
      [dataKey]: !visibleLines[dataKey],
    })
  }

  return (
    <Card className="bg-backgroud">
      <CardHeader className="border-b">
        <CardTitle>&Eacute;volution</CardTitle>
      </CardHeader>
      <CardContent className="p-4 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
                        <div className="font-pixel text-xs">{formatDate(label, 'PP')}</div>
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
                    !visibleLines[translations[value as keyof typeof translations]] &&
                      'line-through'
                  )}
                >
                  {value}
                </Button>
              )}
              onClick={(e) => handleLegendClick(String(e.dataKey))}
            />
            <Area
              type="monotone"
              dataKey="uniquePlayerInDataBase"
              name="Joueurs uniques"
              hide={!visibleLines.uniquePlayerInDataBase}
              fill="url(#players-gradient)"
              stroke={graphColors[3]}
              strokeWidth={3}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="uniqueFactionInDataBase"
              name="Factions uniques"
              hide={!visibleLines.uniqueFactionInDataBase}
              fill="url(#factions-gradient)"
              stroke={graphColors[1]}
              strokeWidth={3}
              dot={false}
            />
            <defs>
              <LinearGradient id="players-gradient" from={graphColors[3]} />
              <LinearGradient id="factions-gradient" from={graphColors[1]} />
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export { ApiDatabaseEvolutionCard }
