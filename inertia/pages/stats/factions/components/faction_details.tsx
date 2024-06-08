import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import type { FactionShowProps } from '../show'
import { useState } from 'react'
import { ToggleGroup } from '@lemonsqueezy/wedges'
import { InformationLine } from '../../components/information_line'
import LinearGradient from '~/components/shared/linear_gradient'
import { formatDate } from '~/lib/date'
import { getHeadUrl } from '~/lib/minecraft'
import { cn, formatNumber } from '~/lib/utils'
import { Link } from '@inertiajs/react'
import {
  Area,
  AreaChart,
  Line,
  CartesianGrid,
  Legend,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type FactionDetailsProps = {
  faction: NonNullable<FactionShowProps['faction']>
}

export const factionDetails = ({ faction }: FactionDetailsProps) => {
  const [graphType, setGraphType] = useState<'level' | 'xp'>('level')
  const eloData = faction.data.map((data) => {
    return {
      date: data.date,
      elo: data.data.elo,
    }
  })

  const level = faction.data.map((data) => {
    return {
      date: data.date,
      level: data.data.level,
    }
  })

  const lastData = faction.data[faction.data.length - 1]
  return (
    <div className="flex flex-col gap-4">
      <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-4">
        <Card className="flex flex-col lg:row-span-2">
          <CardHeader className="border-b">
            <CardTitle className="text-center font-pixel">{faction.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex-1 flex justify-center">
            <img
              src={faction.emblemUrl}
              alt={`${faction.name}'s emblem`}
              className="object-contain h-auto w-full max-w-56"
            />
          </CardContent>
        </Card>
        <Card className="flex flex-col lg:col-span-2">
          <CardHeader className="border-b">
            <CardTitle>Informations</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pt-4">
            <ul className="h-full flex flex-col gap-2 justify-around">
              <li>
                <InformationLine
                  label="Date de création"
                  value={formatDate(new Date(faction.createdAt), 'PP')}
                />
              </li>
              <li>
                <InformationLine label="Effectif" value={`${faction.players.length} joueurs`} />
              </li>
              <li>
                <InformationLine label="Level Actuel" value={lastData.data.level.level} />
              </li>
              <li>
                <InformationLine label="Elo Actuel" value={formatNumber(lastData.data.elo)} />
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="flex flex-col lg:col-span-2">
          <CardHeader className="border-b">
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pt-4">
            <p>{faction.description.length > 0 ? faction.description : 'Pas de description'}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>&Eacute;volution de l'elo</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={eloData}>
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
                      <Card className="bg-background">
                        <CardContent className="p-4 space-y-2">
                          <div className="font-pixel text-xs">{formatDate(label, 'PP')}</div>
                          <div className="flex gap-2 items-center">
                            <span className="text-sm">Elo: </span>
                            <span className="text-sm font-bold">
                              {formatNumber(Number(payload[0].value))}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="elo"
                name="Elo"
                fill="url(#yellow-gradient)"
                stroke="#ffb702"
                strokeWidth={3}
                dot={false}
              />
              <defs>
                <LinearGradient id="yellow-gradient" from="#ffb702" />
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b flex flex-row items-center justify-between py-2">
          <CardTitle>&Eacute;volution du level</CardTitle>
          <ToggleGroup
            type="single"
            value={graphType}
            onValueChange={(value) => {
              if (value.length) {
                setGraphType(value as 'level' | 'xp')
              }
            }}
            size="sm"
            className="!m-0"
          >
            <ToggleGroup.Item value="level">Level</ToggleGroup.Item>
            <ToggleGroup.Item value="xp">XP</ToggleGroup.Item>
          </ToggleGroup>
        </CardHeader>
        <CardContent className="p-0 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart height={200} data={level}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis
                domain={graphType === 'level' ? [0, 100] : undefined}
                orientation="right"
                className="text-xs"
                tickFormatter={(value) => formatNumber(Number(value))}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <Card className="bg-background">
                        <CardContent className="p-4 space-y-2">
                          <div className="font-pixel text-xs">{formatDate(label, 'PP')}</div>
                          <div className="flex flex-col gap-2">
                            {payload.map(({ name, value }) => {
                              return (
                                <div key={name} className="flex gap-2 items-center">
                                  <span className="text-sm">
                                    {name &&
                                      name.toString().charAt(0).toUpperCase() +
                                        name.toString().slice(1)}
                                  </span>
                                  <span className="text-sm font-bold">
                                    {formatNumber(Number(value))}
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
                formatter={(value) =>
                  value.toString().charAt(0).toUpperCase() + value.toString().slice(1)
                }
              />
              <Line
                type="monotone"
                dataKey={graphType === 'level' ? 'level.level' : 'level.xp'}
                name={graphType === 'level' ? 'Level' : 'XP'}
                fill="url(#yellow-gradient)"
                stroke="#ffb702"
                strokeWidth={3}
                dot={false}
              />
              <defs>
                <LinearGradient id="yellow-gradient" from="#ffb702" />
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Membres</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {faction.players.map((player) => (
            <MemberCard key={player.uuid} player={player} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

const MemberCard = ({ player }: { player: FactionDetailsProps['faction']['players'][number] }) => {
  const isLeader = player.group.toLowerCase().includes('leader')
  return (
    <Link href={`/stats/users/${player.username}`}>
      <div className="flex gap-4 border p-4 bg-background/50 rounded-md hover:bg-background/30">
        <img src={getHeadUrl(player.username)} className="object-contain h-full w-auto" />
        <div className="flex flex-col justify-between gap-2">
          <p className="font-pixel text-sm">{player.username}</p>
          <p className={cn('font-mc-dungueons text-xs', isLeader && 'text-primary')}>
            {player.group}
          </p>
          {!isLeader ? (
            <p className="dark:text-surface-200 text-md">
              Membre depuis: {formatDate(new Date(player.joinedAt), 'PP')}
            </p>
          ) : (
            <p>
              <span className="dark:text-surface-200 text-md">Membre depuis la création</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
