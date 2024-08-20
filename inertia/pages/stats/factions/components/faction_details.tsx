import { Link } from '@inertiajs/react'
import { ToggleGroup, Button, DropdownMenu } from '@lemonsqueezy/wedges'
import {
  ChevronDown,
  ArrowDownAZ,
  CalendarArrowUp,
  CalendarArrowDown,
  ChartNoAxesGantt,
} from 'lucide-react'
import { DateTime } from 'luxon'
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
import { formatDate } from '~/lib/date'
import { getHeadUrl } from '~/lib/minecraft'
import { cn, formatNumber } from '~/lib/utils'
import { InformationLine } from '../../components/information_line'
import type { FactionShowProps } from '../show'

type FactionDetailsProps = {
  faction: NonNullable<FactionShowProps['faction']>
}

export const FactionDetails = ({ faction }: FactionDetailsProps) => {
  const [graphType, setGraphType] = useState<'level' | 'xp'>('level')
  const [sortedMembers, setSortedMembers] = useState<'alpha' | 'desc' | 'asc' | 'rang'>('asc')
  const sortedOptions = [
    { value: 'alpha', label: 'Ordre alphabétique', icon: ArrowDownAZ },
    { value: 'desc', label: 'Date décroissante', icon: CalendarArrowUp },
    { value: 'asc', label: 'Date croissante', icon: CalendarArrowDown },
    { value: 'rang', label: 'Grade', icon: ChartNoAxesGantt },
  ]

  const unselectedOptions = sortedOptions.filter((option) => option.value !== sortedMembers)

  const [openSorted, setOpenSorted] = useState(false)

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
        <Card id="informations" className="flex flex-col lg:col-span-2">
          <CardHeader className="border-b">
            <CardTitle href="#informations">Informations</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pt-4">
            <ul className="h-full flex flex-col gap-2 justify-around">
              <li>
                <InformationLine
                  label="Date de création"
                  value={formatDate(new Date(faction.createdAt), DateTime.DATE_MED)}
                />
              </li>
              <li>
                <InformationLine label="Effectif" value={`${faction.players.length} joueurs`} />
              </li>
              {/*<li>
                <InformationLine label="Level Actuel" value={lastData.data.level.level} />
              </li>
              <li>
                <InformationLine label="Elo Actuel" value={formatNumber(lastData.data.elo)} />
              </li>*/}
            </ul>
          </CardContent>
        </Card>
        <Card id="description" className="flex flex-col lg:col-span-2">
          <CardHeader className="border-b">
            <CardTitle href="#description">Description</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pt-4">
            <p>{faction.description.length > 0 ? faction.description : 'Aucune description'}</p>
          </CardContent>
        </Card>
      </div>
      {/*<Card>
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
                          <div className="font-pixel text-xs">{formatDate(label, DateTime.DATE_MED)}</div>
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
            <AreaChart data={level}>
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
                          <div className="font-pixel text-xs">{formatDate(label, DateTime.DATE_MED)}</div>
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
              <Area
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
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>*/}
      <Card id="membres">
        <CardHeader className="border-b flex flex-row items-center justify-between py-2">
          <CardTitle href="#membres">Membres</CardTitle>
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button
                variant="outline"
                className="!m-0 w-50 flex items-center justify-between"
                size="sm"
                after={
                  <ChevronDown
                    className={cn('size-4 transition-transform', openSorted && 'rotate-180')}
                  />
                }
              >
                Trier par
                {' ' + sortedOptions.find((option) => option.value === sortedMembers)?.label}
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              {unselectedOptions.map((option) => (
                <DropdownMenu.Item
                  key={option.value}
                  onClick={() => {
                    setSortedMembers(option.value as 'alpha' | 'desc' | 'asc' | 'rang')
                    setOpenSorted(false)
                  }}
                >
                  <option.icon className="size-4 mr-2" />
                  {option.label}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu>

          {/*<ToggleGroup
            type="single"
            value={sortedMembers}
            onValueChange={(value) => {
              if (value.length) {
                setSortedMembers(value as 'asc' | 'desc' | 'rang' | 'alpha')
              }
            }}
            size="sm"
            className="!m-0"
          >
            <ToggleGroup.Item value="asc">Ascendant</ToggleGroup.Item>
            <ToggleGroup.Item value="desc">Descendant</ToggleGroup.Item>
            <ToggleGroup.Item value="rang">Rang</ToggleGroup.Item>
            <ToggleGroup.Item value="alpha">Alphabétique</ToggleGroup.Item>
          </ToggleGroup>*/}
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {faction.players
            .sort((a, b) => {
              if (sortedMembers === 'asc') {
                return a.joinedAt - b.joinedAt
              } else if (sortedMembers === 'desc') {
                return b.joinedAt - a.joinedAt
              } else if (sortedMembers === 'rang') {
                const isALeader = a.group.toLowerCase().includes('leader')
                const isBLeader = b.group.toLowerCase().includes('leader')

                if (isALeader && !isBLeader) return -1
                if (!isALeader && isBLeader) return 1

                return a.group.localeCompare(b.group)
              } else {
                return a.username.localeCompare(b.username)
              }
            })
            .map((player) => (
              <MemberCard key={player.username} player={player} />
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
        <img
          src={getHeadUrl(player.username)}
          alt={`${player.username}'s avatar`}
          className="object-contain h-full w-auto"
        />
        <div className="flex flex-col justify-between gap-2">
          <p className="font-pixel text-sm">{player.username}</p>
          <p className={cn('font-mc-dungueons text-xs', isLeader && 'text-primary')}>
            {player.group}
          </p>
          {!isLeader ? (
            <p className="dark:text-surface-200 text-md">
              Membre depuis: {formatDate(new Date(player.joinedAt), DateTime.DATE_MED)}
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
