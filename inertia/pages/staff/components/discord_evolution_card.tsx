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

type DiscordEvolutionCardProps = {
  data: Array<Record<string, string | number>>
  icons: Record<string, any>
}

const DiscordEvolutionCard = ({ data, icons }: DiscordEvolutionCardProps) => {
  const translations = {
    Serveurs: 'guildsCount',
    Utilisateurs: 'usersCount',
    Intéractions: 'interactionsCount',
  }

  const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>({
    guildsCount: true,
    usersCount: true,
    interactionsCount: true,
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
                              const Icon = icons[name as keyof typeof icons]
                              return (
                                <div key={name} className="flex gap-2 items-center">
                                  <span className="text-sm">
                                    <Icon className="size-4 mr-2 inline-block" />
                                    {name}
                                  </span>
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
              formatter={(value) => {
                return (
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
                )
              }}
              onClick={(e) => handleLegendClick(String(e.dataKey))}
            />
            <Area
              type="monotone"
              dataKey="guildsCount"
              name="Serveurs"
              hide={!visibleLines.guildsCount}
              fill="url(#guilds-gradient)"
              stroke={graphColors[3]}
              strokeWidth={3}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="usersCount"
              name="Utilisateurs"
              hide={!visibleLines.usersCount}
              fill="url(#users-gradient)"
              stroke={graphColors[1]}
              strokeWidth={3}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="interactionsCount"
              name="Intéractions"
              hide={!visibleLines.interactionsCount}
              fill="url(#interactions-gradient)"
              stroke={graphColors[9]}
              strokeWidth={3}
              dot={false}
            />
            <defs>
              <LinearGradient id="guilds-gradient" from={graphColors[3]} />
              <LinearGradient id="users-gradient" from={graphColors[1]} />
              <LinearGradient id="interactions-gradient" from={graphColors[9]} />
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export { DiscordEvolutionCard }
