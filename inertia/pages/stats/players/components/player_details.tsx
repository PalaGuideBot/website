import { Link } from '@inertiajs/react'
import { Button, ProgressBar, ToggleGroup } from '@lemonsqueezy/wedges'
import { ChevronDown, MousePointerClickIcon } from 'lucide-react'
import { DateTime } from 'luxon'
import * as React from 'react'
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
import { HiddenInformationController } from '~/components/shared/hidden_information_controller'
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
import { getPet, translatePet } from '~/content/pets'
import { formatDate } from '~/lib/date'
import { getHeadUrl, getSkinUrl } from '~/lib/minecraft'
import { noCase } from '~/lib/string'
import { cn, formatDuration, formatNumber, formatPrice } from '~/lib/utils'
import type { Job } from '~/types'
import { InformationLine } from '../../components/information_line'
import type { PlayerShowProps } from '../show'

type PlayerDetailsProps = {
  player: NonNullable<PlayerShowProps['player']>
}

export const PlayerDetails = ({ player }: PlayerDetailsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-4">
        <SkinSection player={player} />
        <InformationsSection player={player} />
        <JobsSection player={player} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MountSection mount={player.mount} />
        <PetSection pet={player.pet} />
      </div>
      <AchievementsSection achievements={player.achievements} />
      <FriendsSection friends={player.friends} />
      <JobsEvolutionSection player={player} />
      <MoneyEvolutionSection player={player} />
      <ClickerEvolutionSection player={player} />
      <ClassementsSection player={player} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FactionHistorySection player={player} />
        <RanksHistorySection player={player} />
      </div>
    </div>
  )
}

interface SkinSectionProps extends React.ComponentProps<typeof Card> {
  player: PlayerDetailsProps['player']
}

const SkinSection = ({ player, className, ...props }: SkinSectionProps) => {
  return (
    <Card className={cn('flex flex-col lg:row-span-2', className)} {...props}>
      <CardHeader className="border-b">
        <CardTitle className="text-center font-pixel">{player.username}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-1 flex justify-center">
        <ReactSkinview3d
          className="!h-auto w-full !pointer-events-none sm:!pointer-events-auto"
          width="278"
          height="450"
          skinUrl={getSkinUrl(player.username)}
        />
      </CardContent>
    </Card>
  )
}

interface InformationsSectionProps extends React.ComponentProps<typeof Card> {
  player: PlayerDetailsProps['player']
}

const InformationsSection = ({ player, className, ...props }: InformationsSectionProps) => {
  const lastPlayerData = player.data.at(-1)

  return (
    <Card id="informations" className={cn('flex flex-col lg:col-span-2', className)} {...props}>
      <CardHeader className="border-b py-2.5">
        <CardTitle href="#informations">Informations</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        <ul className="h-full flex flex-col gap-2 justify-around">
          <li>
            <InformationLine
              label="Première connexion"
              value={formatDate(new Date(player.firstJoin), DateTime.DATE_MED)}
            />
          </li>
          <li>
            <InformationLine
              label="Rank"
              value={<PaladiumRank rank={lastPlayerData!.data.rank} />}
            />
          </li>
          <li>
            <InformationLine
              label="Faction"
              value={
                <Link
                  className="text-sm font-mc-dungueons"
                  href={`/factions/${lastPlayerData!.data.faction}`}
                >
                  <span>{lastPlayerData!.data.faction || 'Wilderness'}</span>
                  {lastPlayerData!.data.factionRank && (
                    <span>{` - ${lastPlayerData!.data.factionRank}`}</span>
                  )}
                </Link>
              }
            />
          </li>
          <li>
            <InformationLine label="Money" value={formatPrice(lastPlayerData!.data.money)} />
          </li>
          <li>
            <InformationLine
              label="Temps de jeu"
              value={
                <HiddenInformationController
                  active={lastPlayerData!.data.timePlayed === -1}
                  children={<span className="text-xs sm:text-sm font-mc-dungueons">Masqué</span>}
                  side="right"
                  align="center"
                  fallback={
                    <span className="text-xs sm:text-sm font-mc-dungueons">
                      {formatDuration(lastPlayerData!.data.timePlayed)}
                    </span>
                  }
                />
              }
            />
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

interface JobsSectionProps extends React.ComponentProps<typeof Card> {
  player: PlayerDetailsProps['player']
}

const JobsSection = ({ player, className, ...props }: JobsSectionProps) => {
  const lastPlayerData = player.data.at(-1)

  return (
    <Card id="metiers" className={cn('flex flex-col lg:col-span-2', className)} {...props}>
      <CardHeader className="border-b py-2.5">
        <CardTitle href="#metiers">Métiers</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center flex-1 pt-4">
        {Object.entries(lastPlayerData!.data.jobs).map(([job, info]) => (
          <PaladiumJob key={job} job={job} info={info} />
        ))}
      </CardContent>
    </Card>
  )
}

interface MountSectionProps extends React.ComponentProps<typeof Card> {
  mount: PlayerDetailsProps['player']['mount']
}

const MountSection = ({ mount, className, ...props }: MountSectionProps) => {
  const foodPercent = Number(mount?.food) / 100

  return (
    <Card className={cn('flex flex-col', className)} id="monture" {...props}>
      <CardHeader className="border-b py-2.5">
        <CardTitle href="#monture">Monture</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex flex-1 flex-col justify-center">
        {mount && (
          <>
            <MountViewer
              className="!pointer-events-none sm:!pointer-events-auto"
              model={getMountNameByType(mount.mountType)}
            />
            <ul className="flex flex-col gap-2">
              <li>
                <InformationLine label="Name" value={mount.name} />
              </li>
              <li>
                <InformationLine label="Xp" value={mount.xp} />
              </li>
              <li>
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
              </li>
            </ul>
          </>
        )}
        {!mount && <p className="text-center">Aucune monture trouvée</p>}
      </CardContent>
    </Card>
  )
}

interface PetSectionProps extends React.ComponentProps<typeof Card> {
  pet: PlayerDetailsProps['player']['pet']
}

const PetSection = ({ pet, className, ...props }: PetSectionProps) => {
  const happinessPercent = (Number(pet?.happiness) / 200) * 100

  return (
    <Card className={cn('flex flex-col', className)} id="familier" {...props}>
      <CardHeader className="border-b py-2.5">
        <CardTitle href="#familier">Familier</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex flex-1 flex-col">
        {pet && (
          <>
            <PetViewer
              className="!pointer-events-none sm:!pointer-events-auto"
              model={getPet(pet.currentSkin)}
            />
            <ul className="flex flex-col gap-2">
              <li>
                <InformationLine label="Skin" value={translatePet(getPet(pet.currentSkin))} />
              </li>
              <li>
                <InformationLine label="Nombre de skills" value={pet.skills.length} />
              </li>
              <li>
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
              </li>
            </ul>
          </>
        )}
        {!pet && <p className="text-center">Aucun familier trouvé</p>}
      </CardContent>
    </Card>
  )
}

interface AchievementsSectionProps extends React.ComponentProps<typeof Card> {
  achievements: PlayerDetailsProps['player']['achievements']
}

const AchievementsSection = ({ achievements, ...props }: AchievementsSectionProps) => {
  const completionPercentage = (achievements.completed / achievements.total) * 100

  return (
    <Card id="succes" {...props}>
      <CardHeader className="border-b py-2.5">
        <CardTitle href="#succes">Succès</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ProgressBar
          max={100}
          value={completionPercentage}
          label="Progression"
          indicator={completionPercentage.toFixed(2) + '%'}
          helperText={`${achievements.completed} / ${achievements.total} succès`}
        />
      </CardContent>
    </Card>
  )
}

interface FriendsSectionProps extends React.ComponentProps<typeof Card> {
  friends: PlayerDetailsProps['player']['friends']
}

const FriendsSection = ({ friends, ...props }: FriendsSectionProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card id="amis" {...props}>
        <CardHeader
          className={cn(
            'space-y-0 flex flex-row justify-between items-center py-2',
            open && 'border-b'
          )}
        >
          <CardTitle href="#amis">Amis [{friends.length}]</CardTitle>
          <CollapsibleTrigger asChild>
            <Button variant="outline" isIconOnly>
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
                  href={`/players/${friend.username}`}
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

interface JobsEvolutionSectionProps extends React.ComponentProps<typeof Card> {
  player: PlayerDetailsProps['player']
}

const JobsEvolutionSection = ({ player, ...props }: JobsEvolutionSectionProps) => {
  const [graphType, setGraphType] = React.useState<'level' | 'xp'>('level')

  const sortedUserData = (player?.data || []).toSorted(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <Card id="evolution-des-metiers" {...props}>
      <CardHeader className="space-y-0 border-b flex flex-row items-center justify-between py-2">
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
            {Object.keys(player.data[0].data.jobs).map((job) => (
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
  )
}

interface MoneyEvolutionSectionProps extends React.ComponentProps<typeof Card> {
  player: PlayerDetailsProps['player']
}

const MoneyEvolutionSection = ({ player, ...props }: MoneyEvolutionSectionProps) => {
  const sortedUserData = (player?.data || []).toSorted(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <Card id="evolution-de-l-argent" {...props}>
      <CardHeader className="border-b py-2.5">
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
  )
}

interface ClickerEvolutionSectionProps extends React.ComponentProps<typeof Card> {
  player: PlayerDetailsProps['player']
}

const ClickerEvolutionSection = ({ player, ...props }: ClickerEvolutionSectionProps) => {
  const [graphType, setGraphType] = React.useState<'rps' | 'production'>('rps')

  const playerDataFiltered = player.data.filter(
    (data) => data.data.clicker?.rps || data.data.clicker?.production
  )

  const sortedUserData = (playerDataFiltered || []).toSorted(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <Card id="evolution-du-clicker" {...props}>
      <CardHeader className="space-y-0 border-b flex flex-row flex-wrap items-center justify-between py-2">
        <CardTitle href="#evolution-du-clicker">Évolution du clicker</CardTitle>
        <div className="flex flex-row gap-2">
          <Button variant="outline" className="min-w-[34px]" isIconOnly asChild>
            <Link href={`/tools/clicker/${player.username}`}>
              <MousePointerClickIcon className="size-4" />
            </Link>
          </Button>
          <ToggleGroup
            type="single"
            value={graphType}
            onValueChange={(value) => {
              if (value.length) {
                setGraphType(value as 'rps' | 'production')
              }
            }}
            size="sm"
          >
            <ToggleGroup.Item value="rps">RPS</ToggleGroup.Item>
            <ToggleGroup.Item value="production">Production</ToggleGroup.Item>
          </ToggleGroup>
        </div>
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
                          <span className="text-sm">
                            {graphType === 'rps' ? 'RPS' : 'Production'}:{' '}
                          </span>
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
              dataKey={`data.clicker.${graphType}`}
              name={graphType.toUpperCase()}
              fill="url(#orange-gradient)"
              stroke="#f4952f"
              strokeWidth={3}
              dot={false}
            />
            <defs>
              <LinearGradient id="orange-gradient" from="#f4952f" />
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface ClassementsSectionProps extends React.ComponentProps<typeof Card> {
  player: PlayerDetailsProps['player']
}

const ClassementsSection = ({ player, ...props }: ClassementsSectionProps) => {
  return (
    <Card id="classements" {...props}>
      <CardHeader className="border-b py-2.5">
        <CardTitle href="#classements">Classements</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(player.leaderboard)
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
                    {![-1, 0].includes(value)
                      ? `# ${formatNumber(value, { notation: 'standard' })}`
                      : 'Non classé'}
                  </span>
                </div>
              </div>
            )
          })}
      </CardContent>
    </Card>
  )
}

interface FactionHistorySectionProps extends React.ComponentProps<typeof Card> {
  player: PlayerDetailsProps['player']
}

const FactionHistorySection = ({ player, ...props }: FactionHistorySectionProps) => {
  const sortedUserData = (player?.data || []).toSorted(
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

  return (
    <Card id="historique-des-factions" {...props}>
      <CardHeader className="border-b py-2.5">
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
                  <Link href={`/factions/${entry.faction !== 'Wilderness' ? entry.faction : ''}`}>
                    <GlowText>{entry.faction}</GlowText>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

interface RanksHistorySectionProps extends React.ComponentProps<typeof Card> {
  player: PlayerDetailsProps['player']
}

const RanksHistorySection = ({ player, ...props }: RanksHistorySectionProps) => {
  const sortedUserData = (player?.data || []).toSorted(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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

  return (
    <Card id="historique-des-rangs" {...props}>
      <CardHeader className="border-b py-2.5">
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
  )
}
