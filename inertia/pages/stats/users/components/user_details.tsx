import { Link } from '@inertiajs/react'
import { Button, ProgressBar, ToggleGroup } from '@lemonsqueezy/wedges'
import { ChevronDown } from 'lucide-react'
import { DateTime } from 'luxon'
import { useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { GlowText } from '~/components/glow_text'
import { ArrowRightIcon } from '~/components/icons'
import LinearGradient from '~/components/shared/linear_gradient'
import PaladiumJob from '~/components/shared/paladium_job'
import PaladiumRank from '~/components/shared/paladium_rank'
import ReactSkinview3d from '~/components/skin_viewer_3d'
import { MountViewer } from '~/components/three/mount'
import { PetViewer } from '~/components/three/pet'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { smallIcons as smallJobIcons } from '~/content/jobs'
import { icons as leaderboardIcons } from '~/content/leaderboards'
import { getMountNameByType } from '~/content/mounts'
import { getPet } from '~/content/pets'
import { formatDate } from '~/lib/date'
import { getHeadUrl, getSkinUrl } from '~/lib/minecraft'
import { noCase } from '~/lib/string'
import { cn, formatDuration, formatNumber, formatPrice } from '~/lib/utils'
import type { Job } from '~/types'
import { InformationLine } from '../../components/information_line'
import type { UserShowProps } from '../show'

type UserDetailsProps = {
  user: NonNullable<UserShowProps['exampleUser']>
}

export const UserDetails = ({ user }: UserDetailsProps) => {
  const [graphType, setGraphType] = useState<'level' | 'xp'>('level')
  const sortedUserData = (user?.data || []).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const factionHistory = sortedUserData.reduce(
    (history: { period: string; faction: string }[], data) => {
      const { faction, date } = {
        faction: data.data.faction || 'Wilderness',
        date: data.date,
      }

      const lastHistory = history[history.length - 1]

      if (!lastHistory || lastHistory.faction !== faction) {
        history.push({
          period: `${formatDate(date, DateTime.DATE_MED)} au ${formatDate(date, DateTime.DATE_MED)}`,
          faction: faction,
        })
      } else {
        lastHistory.period = `${formatDate(date, DateTime.DATE_MED)} au ${lastHistory.period.split(' au ')[1]}`
      }

      return history
    },
    []
  )

  const rankHistory = sortedUserData.reduce((history: { period: string; rank: string }[], data) => {
    const { rank, date } = {
      rank: data.data.rank === 'default' ? 'joueur' : data.data.rank,
      date: data.date,
    }

    const lastHistory = history[history.length - 1]

    if (!lastHistory || lastHistory.rank !== rank) {
      history.push({
        period: `${formatDate(date, DateTime.DATE_MED)} au ${formatDate(date, DateTime.DATE_MED)}`,
        rank: rank,
      })
    } else {
      lastHistory.period = `${formatDate(date, DateTime.DATE_MED)} au ${lastHistory.period.split(' au ')[1]}`
    }

    return history
  }, [])

  const lastUserData = sortedUserData.at(0)

  const averageTimePlayed = () => {
    const lastTimePlayed = lastUserData!.data.timePlayed
    const now = new Date()
    const past = new Date(user.firstJoin)
    const diffTime = Math.abs(now.getTime() - past.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const duration = formatDuration(lastTimePlayed / diffDays)

    return duration.length ? duration : '-'
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-4">
        <Card className="flex flex-col lg:row-span-2">
          <CardHeader className="border-b">
            <CardTitle className="text-center font-pixel">{user.username}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex-1 flex justify-center">
            <ReactSkinview3d
              className="!h-auto w-full"
              width="278"
              height="450"
              skinUrl={getSkinUrl(user.username)}
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
                  label="Première connexion"
                  value={formatDate(new Date(user.firstJoin), DateTime.DATE_MED)}
                />
              </li>
              <li>
                <InformationLine
                  label="Rank"
                  value={<PaladiumRank rank={lastUserData!.data.rank} />}
                />
              </li>
              <li>
                <InformationLine
                  label="Faction"
                  value={
                    <Link
                      className="text-sm font-mc-dungueons"
                      href={`/stats/factions/${lastUserData!.data.faction}`}
                    >
                      <GlowText>{lastUserData!.data.faction || 'Wilderness'}</GlowText>
                    </Link>
                  }
                />
              </li>
              <li>
                <InformationLine label="Money" value={formatPrice(lastUserData!.data.money)} />
              </li>
              <li>
                <InformationLine
                  label="Temps de jeu"
                  value={formatDuration(lastUserData!.data.timePlayed)}
                />
              </li>
              <li>
                <InformationLine label="Moy. temps jeu quotidien" value={averageTimePlayed()} />
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="flex lg:col-span-2">
          <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center flex-1 pt-4">
            {Object.entries(lastUserData!.data.jobs).map(([job, info]) => (
              <PaladiumJob key={job} job={job} info={info} />
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="flex flex-col" id="monture">
          <CardHeader className="border-b">
            <CardTitle href="#monture">Monture</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex flex-1 flex-col justify-center">
            {user.mount && (
              <>
                <MountViewer model={getMountNameByType(user.mount.mountType)} />
                <ul className="flex flex-col gap-2">
                  <li>
                    <InformationLine label="Name" value={user.mount.name} />
                  </li>
                  <li>
                    <InformationLine label="Xp" value={user.mount.xp} />
                  </li>
                  <li>
                    <FoodProgress mount={user.mount} />
                  </li>
                </ul>
              </>
            )}
            {!user.mount && <p className="text-center">Aucune monture trouvée</p>}
          </CardContent>
        </Card>
        <Card className="flex flex-col" id="familier">
          <CardHeader className="border-b">
            <CardTitle href="#animal">Familier</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex flex-1 flex-col">
            {user.pet && (
              <>
                <PetViewer model={getPet(user.pet.currentSkin)} />
                <ul className="flex flex-col gap-2">
                  <li>
                    <InformationLine label="Skin" value={getPet(user.pet.currentSkin)} />
                  </li>
                  <li>
                    <InformationLine label="Nombre de skills" value={user.pet.skills.length} />
                  </li>
                  <li>
                    <HappinessProgress pet={user.pet} />
                  </li>
                </ul>
              </>
            )}
            {!user.pet && <p className="text-center">Aucun animal trouvé</p>}
          </CardContent>
        </Card>
      </div>
      <Card id="succes">
        <CardHeader className="border-b">
          <CardTitle href="#succes">Succès</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <AchievementsProgress achievements={user.achievements} />
        </CardContent>
      </Card>
      <FriendsCard friends={user.friends} />
      <Card id="evolution-des-metiers">
        <CardHeader className="border-b flex flex-row items-center justify-between py-2">
          <CardTitle href="#evolution-des-metiers">&Eacute;volution des métiers</CardTitle>
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
            <LineChart height={200} data={sortedUserData.toReversed()}>
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
                          <div className="font-pixel text-xs">
                            {formatDate(label, DateTime.DATE_MED)}
                          </div>
                          <div className="flex flex-col gap-2">
                            {payload.map(({ name, value }) => {
                              const Icon = smallJobIcons[name as Job]
                              return (
                                <div key={name} className="flex gap-2 items-center">
                                  <span className="text-sm">
                                    <Icon className="w-4 mr-2" />
                                    {name &&
                                      name.toString().charAt(0).toUpperCase() +
                                        name.toString().slice(1)}
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
                formatter={(value) =>
                  value.toString().charAt(0).toUpperCase() + value.toString().slice(1)
                }
              />
              {Object.keys(user.data[0].data.jobs).map((job) => (
                <Line
                  key={job}
                  type="monotone"
                  dataKey={`data.jobs.${job}.${graphType}`}
                  name={job}
                  stroke={`var(--job-${job})`}
                  strokeWidth={3}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card id="evolution-de-l-argent">
        <CardHeader className="border-b">
          <CardTitle href="#evolution-de-l-argent">&Eacute;volution de l'argent</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sortedUserData.toReversed()}>
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
                          <div className="font-pixel text-xs">
                            {formatDate(label, DateTime.DATE_MED)}
                          </div>
                          <div className="flex gap-2 items-center">
                            <span className="text-sm">Argent: </span>
                            <span className="text-sm font-bold">
                              {formatPrice(Number(payload[0].value))}
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
                dataKey="data.money"
                name="Argent"
                fill="url(#green-gradient)"
                stroke="#82ca9d"
                strokeWidth={3}
                dot={false}
              />
              <defs>
                <LinearGradient id="green-gradient" from="#82ca9d" />
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card id="classements">
        <CardHeader className="border-b">
          <CardTitle href="#classements">Classements</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(user.leaderboard)
            .filter(([key]) => !['corruption', 'chorus', 'end'].includes(key))
            .filter(([value]) => value !== '-1' && value !== '0')
            .map(([key, value]) => {
              const Icon = leaderboardIcons[key as keyof typeof leaderboardIcons]
              return (
                <div
                  key={key}
                  className="flex gap-4 border p-4 bg-background/50 rounded-md hover:bg-background/30"
                >
                  {Icon && <Icon className="w-12" />}
                  <div className="flex flex-col gap-2">
                    <span className="font-pixel text-xs">{noCase(key)}</span>
                    <span className="text-sm text-primary font-mc-dungueons">
                      {value !== -1
                        ? `# ${formatNumber(value, { notation: 'standard' })}`
                        : 'Non classé'}
                    </span>
                  </div>
                </div>
              )
            })}
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card id="historique-des-factions">
          <CardHeader className="border-b">
            <CardTitle href="#historique-des-factions">Historique des factions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table className="text-nowrap">
              <TableHeader>
                <TableRow>
                  <TableHead>Période</TableHead>
                  <TableHead>Faction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {factionHistory.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.period}</TableCell>
                    <TableCell>
                      <Link
                        href={`/stats/factions/${entry.faction !== 'Wilderness' ? entry.faction : ''}`}
                      >
                        <GlowText>{entry.faction}</GlowText>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card id="historique-des-rangs">
          <CardHeader className="border-b">
            <CardTitle href="#historique-des-rangs">Historique des rangs</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table className="text-nowrap">
              <TableHeader>
                <TableRow>
                  <TableHead>Période</TableHead>
                  <TableHead>Rank</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rankHistory.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.period}</TableCell>
                    <TableCell>
                      <PaladiumRank rank={entry.rank} className="text-xs" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const HappinessProgress = ({ pet }: { pet: NonNullable<UserDetailsProps['user']['pet']> }) => {
  const { happiness } = pet
  const happinessPercent = (happiness / 200) * 100

  return (
    <ProgressBar
      max={100}
      indicator={happinessPercent.toFixed(2) + '%'}
      label={
        <div className="flex gap-2 items-center">
          <span className="font-pixel text-xs xs:text-base text-pretty">Happiness</span>
          <ArrowRightIcon className="w-2 invert dark:invert-0" />
        </div>
      }
      value={happinessPercent}
      variant="inline"
    />
  )
}

const FoodProgress = ({ mount }: { mount: NonNullable<UserDetailsProps['user']['mount']> }) => {
  const { food } = mount
  const foodPercent = food / 100

  return (
    <ProgressBar
      max={100}
      indicator={foodPercent.toFixed(2) + '%'}
      label={
        <div className="flex gap-2 items-center">
          <span className="font-pixel text-xs xs:text-base text-pretty">Food</span>
          <ArrowRightIcon className="w-2 invert dark:invert-0" />
        </div>
      }
      value={foodPercent}
      variant="inline"
    />
  )
}

const AchievementsProgress = ({
  achievements,
}: {
  achievements: UserDetailsProps['user']['achievements']
}) => {
  const completionPercentage = (achievements.completed / achievements.total) * 100

  return (
    <ProgressBar
      max={100}
      value={completionPercentage}
      label="Progression"
      indicator={completionPercentage.toFixed(2) + '%'}
      helperText={`${achievements.completed} / ${achievements.total} succès`}
    />
  )
}

const FriendsCard = ({ friends }: { friends: UserDetailsProps['user']['friends'] }) => {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card id="amis">
        <CardHeader
          className={cn('flex flex-row justify-between items-center py-2', open && 'border-b')}
        >
          <CardTitle href="#amis">Amis [{friends.length}]</CardTitle>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="!m-0" isIconOnly>
              <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent
            className={cn(
              'pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4',
              friends.length === 0 && 'sm:grid-cols-1'
            )}
          >
            {friends.length === 0 && (
              <div className="h-20 w-full flex items-center justify-center">Aucun ami trouvé</div>
            )}
            {friends.length !== 0 &&
              friends.map((friend) => (
                <Link
                  key={friend.uuid}
                  href={`/stats/users/${friend.username}`}
                  className="flex gap-4 border p-4 bg-background/50 rounded-md hover:bg-background/30"
                >
                  <img
                    src={getHeadUrl(friend.username)}
                    alt={`${friend.username} avatar`}
                    className="size-12 rounded-sm"
                  />
                  <div className="flex flex-col gap-2">
                    <span className="font-pixel text-xs">{friend.username}</span>
                    <PaladiumRank rank={friend.rank} className="text-xs text-primary" />
                  </div>
                </Link>
              ))}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
