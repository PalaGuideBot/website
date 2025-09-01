import { Link, useForm } from '@inertiajs/react'
import {
  ChevronDownIcon,
  FilterIcon,
  MousePointerClickIcon,
  PauseIcon,
  PlayIcon,
} from 'lucide-react'
import * as React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { toast } from 'sonner'

import { GlowText } from '~/components/glow_text'
import { MarketMoneyIcon, MarketPbIcon, QuestionIcon } from '~/components/icons'
import { HiddenInformationController } from '~/components/shared/hidden_information_controller'
import { LinearGradient } from '~/components/shared/linear_gradient'
import { PaladiumJob } from '~/components/shared/paladium_job'
import { PaladiumRank } from '~/components/shared/paladium_rank'
import { PlayerBadge } from '~/components/shared/player_badge'
import { SkinViewer3d } from '~/components/skin_viewer_3d'
import { MountViewer } from '~/components/three/mount'
import { PetViewer } from '~/components/three/pet'
import { Alert, AlertDescription } from '~/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'
import { FormLabel } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Progress } from '~/components/ui/progress'
import { ScrollArea } from '~/components/ui/scroll_area'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle_group'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { smallIcons as smallJobIcons } from '~/content/jobs'
import { icons as leaderboardIcons } from '~/content/leaderboards'
import { sortOptions } from '~/content/market'
import { getMountNameByType } from '~/content/mounts'
import { getPet, translatePet } from '~/content/pets'
import { useCopyToClipboard } from '~/hooks/use_copy_clipboard'
import { formatDate } from '~/lib/date'
import { DateTime } from '~/lib/luxon'
import { getHeadUrl, getMinecraftItemUrl, getSkinUrl, removeColorCodes } from '~/lib/minecraft'
import { noCase } from '~/lib/string'
import { cn, formatDuration, formatNumber, formatPrice } from '~/lib/utils'
import type { Job } from '~/types'
import { InformationLine } from '../../components/information_line'
import type { PlayerShowProps } from '../show'

interface PlayerDetailsProps {
  player: NonNullable<PlayerShowProps['player']>
}

export const PlayerDetails = ({ player }: PlayerDetailsProps) => {
  const lastPlayerDataExists = Boolean(player.data.at(-1))

  return (
    <div className="flex flex-col gap-4">
      {!lastPlayerDataExists && (
        <Alert variant="warning">
          <AlertDescription>Aucune donnée trouvée pour la période sélectionnée.</AlertDescription>
        </Alert>
      )}
      {lastPlayerDataExists && (
        <>
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
          <MarketSection player={player} />
        </>
      )}
    </div>
  )
}

interface SkinSectionProps extends React.ComponentProps<typeof Card> {
  player: PlayerDetailsProps['player']
}

const SkinSection = ({ player, className, ...props }: SkinSectionProps) => {
  return (
    <Card className={cn('lg:row-span-2 pt-2', className)} {...props}>
      <CardHeader className="border-b justify-center pb-2!">
        <div className="inline-flex items-center gap-2">
          <CardTitle className="block">{player.username}</CardTitle>
          <PlayerBadge player={player} />
        </div>
      </CardHeader>
      <CardContent className="pt-4 flex-1 flex justify-center">
        <SkinViewer3d
          className="h-auto! w-full pointer-events-none! sm:pointer-events-auto!"
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
    <Card id="informations" className={cn('lg:col-span-2 pt-2', className)} {...props}>
      <CardHeader className="border-b pb-2!">
        <CardTitle href="#informations">Informations</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-1">
        <ul className="h-full flex flex-col gap-2">
          <li>
            <InformationLine
              label="Première connexion"
              value={formatDate(new Date(player.firstSeen), DateTime.DATE_MED)}
            />
          </li>
          {lastPlayerData && (
            <>
              <li>
                <InformationLine
                  label="Rank"
                  value={<PaladiumRank rank={lastPlayerData.data.rank} />}
                />
              </li>
              <li>
                <InformationLine
                  label="Faction"
                  value={
                    <Link
                      className="text-sm font-mc-dungueons"
                      href={`/factions/${lastPlayerData.data.faction}`}
                    >
                      <span>{lastPlayerData.data.faction || 'Wilderness'}</span>
                      {lastPlayerData.data.factionRank && (
                        <span>{` - ${lastPlayerData.data.factionRank}`}</span>
                      )}
                    </Link>
                  }
                />
              </li>
              <li>
                <InformationLine
                  label="Money"
                  value={
                    lastPlayerData.data.money === -1
                      ? 'Indisponible'
                      : formatPrice(lastPlayerData.data.money)
                  }
                />
              </li>
              <li>
                <InformationLine
                  label="Temps de jeu"
                  value={
                    lastPlayerData.data.timePlayed === 0 ? (
                      <span className="text-xs sm:text-sm font-mc-dungueons">
                        Aucun cette saison
                      </span>
                    ) : (
                      <HiddenInformationController
                        active={lastPlayerData.data.timePlayed === -1}
                        children={
                          <span className="text-xs sm:text-sm font-mc-dungueons">Masqué</span>
                        }
                        side="right"
                        align="center"
                        fallback={
                          <span className="text-xs sm:text-sm font-mc-dungueons">
                            {formatDuration(lastPlayerData.data.timePlayed)}
                          </span>
                        }
                      />
                    )
                  }
                />
              </li>
            </>
          )}
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

  if (!lastPlayerData) {
    return null
  }

  return (
    <Card id="metiers" className={cn('lg:col-span-2 pt-2', className)} {...props}>
      <CardHeader className="border-b pb-2!">
        <CardTitle href="#metiers">Métiers</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center flex-1">
        {Object.entries(lastPlayerData.data.jobs).map(([job, info]) => (
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
  const [isLooping, setIsLooping] = React.useState(false)

  const toggleLoop = () => {
    setIsLooping(!isLooping)
  }

  return (
    <Card id="monture" className={cn('pt-2', className)} {...props}>
      <CardHeader className="border-b items-center justify-between pr-2 pb-2!">
        <CardTitle href="#monture">Monture</CardTitle>
        {mount && (
          <Button variant="outline" size="icon" className="rounded-sm" onClick={toggleLoop}>
            {isLooping ? <PauseIcon /> : <PlayIcon />}
          </Button>
        )}
      </CardHeader>
      <CardContent className="pt-4 flex-1 flex flex-col justify-center">
        {mount && (
          <>
            <MountViewer
              className="pointer-events-none! sm:pointer-events-auto!"
              model={getMountNameByType(mount.mountType)}
              isLooping={isLooping}
            />
            <ul className="flex flex-col gap-2">
              <li>
                <InformationLine label="Name" value={mount.name} />
              </li>
              <li>
                <InformationLine label="Niveau" value={mount.level} />
              </li>
              <li>
                <InformationLine
                  label="Food"
                  value={
                    <div className="flex items-center gap-2 w-full">
                      <Progress max={100} value={foodPercent} className="grow" />
                      <span className="text-sm">{foodPercent.toFixed(2) + '%'}</span>
                    </div>
                  }
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
  const [isLooping, setIsLooping] = React.useState(false)

  const toggleLoop = () => {
    setIsLooping(!isLooping)
  }

  return (
    <Card className={cn('pt-2', className)} id="familier" {...props}>
      <CardHeader className="border-b items-center justify-between pr-2 pb-2!">
        <CardTitle href="#familier">Familier</CardTitle>
        {pet && (
          <Button variant="outline" size="icon" className="rounded-sm" onClick={toggleLoop}>
            {isLooping ? <PauseIcon /> : <PlayIcon />}
          </Button>
        )}
      </CardHeader>
      <CardContent className="pt-4 flex-1 flex flex-col justify-center">
        {pet && (
          <>
            <PetViewer
              className="pointer-events-none! sm:pointer-events-auto!"
              model={getPet(pet.currentSkin)}
              isLooping={isLooping}
            />
            <ul className="flex flex-col gap-2 mt-4">
              <li>
                <InformationLine label="Skin" value={translatePet(getPet(pet.currentSkin))} />
              </li>
              <li>
                <InformationLine label="Niveau" value={pet.level} />
              </li>
              <li>
                <InformationLine
                  label="Happiness"
                  value={
                    <div className="flex items-center gap-2 w-full">
                      <Progress max={100} value={happinessPercent} className="grow" />
                      <span className="text-sm">{happinessPercent.toFixed(2) + '%'}</span>
                    </div>
                  }
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

const AchievementsSection = ({ achievements, className, ...props }: AchievementsSectionProps) => {
  const completionPercentage = (achievements.completed / achievements.total) * 100

  return (
    <Card id="succes" className={cn('pt-2', className)} {...props}>
      <CardHeader className="border-b pb-2!">
        <CardTitle href="#succes">Succès</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <HiddenInformationController
          active={achievements.total === 0}
          children={<span className="text-xs sm:text-sm font-mc-dungueons">Masqué</span>}
          side="right"
          align="center"
          fallback={
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center justify-between gap-2">
                <span className="text-sm">Progression</span>
                <span className="text-sm">{completionPercentage.toFixed(2) + '%'}</span>
              </div>
              <Progress max={100} value={completionPercentage} />
              <span className="text-sm text-muted-foreground">{`${achievements.completed} / ${achievements.total} succès`}</span>
            </div>
          }
        />
      </CardContent>
    </Card>
  )
}

interface FriendsSectionProps extends React.ComponentProps<typeof Card> {
  friends: PlayerDetailsProps['player']['friends']
}

const FriendsSection = ({ friends, className, ...props }: FriendsSectionProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card id="amis" className={cn('p-0 pt-2', className)} {...props}>
        <CardHeader className={cn('justify-between items-center pr-2 pb-2!', open && 'border-b')}>
          <CardTitle href="#amis">
            {friends.length === 1 ? 'Ami' : 'Amis'} [{friends.length}]
          </CardTitle>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-sm">
              <ChevronDownIcon className={cn('transition-transform', open && 'rotate-180')} />
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent
            className={cn(
              'grid grid-cols-1 sm:grid-cols-2 gap-4 py-4',
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

const JobsEvolutionSection = ({ player, className, ...props }: JobsEvolutionSectionProps) => {
  const [graphType, setGraphType] = React.useState<'level' | 'xp'>('level')

  const sortedUserData = (player?.data || []).toSorted(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <Card id="evolution-des-metiers" className={cn('pt-2', className)} {...props}>
      <CardHeader className="border-b items-center justify-between pr-2 pb-2!">
        <CardTitle href="#evolution-des-metiers">&Eacute;volution des métiers</CardTitle>
        <ToggleGroup
          variant="outline"
          type="single"
          value={graphType}
          onValueChange={(value) => {
            if (value.length) {
              setGraphType(value as 'level' | 'xp')
            }
          }}
          size="sm"
        >
          <ToggleGroupItem value="level">Level</ToggleGroupItem>
          <ToggleGroupItem value="xp">XP</ToggleGroupItem>
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
            <RechartsTooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="bg-background">
                      <CardContent className="space-y-2">
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
            {Object.keys(smallJobIcons).map((job) => (
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

const MoneyEvolutionSection = ({ player, className, ...props }: MoneyEvolutionSectionProps) => {
  const sortedUserData = (player?.data || []).toSorted(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <Card id="evolution-de-l-argent" className={cn('pt-2', className)} {...props}>
      <CardHeader className="border-b pb-2!">
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
            <RechartsTooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="bg-background">
                      <CardContent className="space-y-2">
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

const ClickerEvolutionSection = ({ player, className, ...props }: ClickerEvolutionSectionProps) => {
  const [graphType, setGraphType] = React.useState<'rps' | 'production'>('rps')

  const playerDataFiltered = player.data.filter(
    (data) => data.data.clicker?.rps || data.data.clicker?.production
  )

  const sortedUserData = (playerDataFiltered || []).toSorted(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <Card id="evolution-du-clicker" className={cn('pt-2', className)} {...props}>
      <CardHeader className="border-b flex-wrap items-center justify-between pr-2 pb-2!">
        <CardTitle href="#evolution-du-clicker">Évolution du clicker</CardTitle>
        <div className="flex flex-row gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/tools/clicker/${player.username}`}>
              <MousePointerClickIcon />
            </Link>
          </Button>
          <ToggleGroup
            type="single"
            variant="outline"
            value={graphType}
            onValueChange={(value) => {
              if (value.length) {
                setGraphType(value as 'rps' | 'production')
              }
            }}
            size="sm"
          >
            <ToggleGroupItem value="rps">RPS</ToggleGroupItem>
            <ToggleGroupItem value="production">Production</ToggleGroupItem>
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
            <RechartsTooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="bg-background">
                      <CardContent className="space-y-2">
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

const ClassementsSection = ({ player, className, ...props }: ClassementsSectionProps) => {
  return (
    <Card id="classements" className={cn('pt-2', className)} {...props}>
      <CardHeader className="border-b pb-2!">
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

const FactionHistorySection = ({ player, className, ...props }: FactionHistorySectionProps) => {
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
    <Card id="historique-des-factions" className={cn('p-0 pt-2', className)} {...props}>
      <CardHeader className="border-b pb-2!">
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

const RanksHistorySection = ({ player, className, ...props }: RanksHistorySectionProps) => {
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
    <Card id="historique-des-rangs" className={cn('p-0 pt-2', className)} {...props}>
      <CardHeader className="border-b pb-2!">
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

interface MarketSectionProps extends React.ComponentProps<typeof Card> {
  player: PlayerDetailsProps['player']
}

const MarketSection = ({ player, className, ...props }: MarketSectionProps) => {
  const [, copy] = useCopyToClipboard()

  const form = useForm({
    search: '',
    sort: 'recent',
  })

  const onCopy = () => {
    const criteria = [`@p:${player.username}`, form.data.search]
      .filter((c) => c.length > 0)
      .join(' ')

    toast.promise(() => copy(criteria), {
      success: 'Critère copié !',
      error: 'Erreur lors de la copie',
    })
  }

  const data = React.useMemo(() => {
    return player.market.data
      .filter((entry) => {
        if (form.data.search.length === 0) {
          return true
        }

        return entry.name.toLowerCase().includes(form.data.search.toLowerCase())
      })
      .toSorted((a, b) => {
        switch (form.data.sort) {
          case 'recent':
            return b.createdAt - a.createdAt
          case 'alphabetic':
            return a.name.localeCompare(b.name)
          case 'asc':
            return a.price - b.price
          case 'desc':
            return b.price - a.price
          default:
            return 0
        }
      })
  }, [form.data.search, form.data.sort, player.market.data])

  return (
    <Card id="market" className={cn('pt-2 pb-0', className)} {...props}>
      <CardHeader className="border-b pr-2 pb-2! items-center justify-between">
        <CardTitle href="#market">Market</CardTitle>
        <div className="flex flex-row gap-2 items-center">
          <p className="text-xs">
            Dernière mise à jour: {formatDate(player.market.lastUpdate, DateTime.DATETIME_SHORT)}
          </p>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <FilterIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" side="right">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm leading-none">Rechercher</h4>
                  <p className="text-xs text-muted-foreground">Entrez vos critères de recherche.</p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <FormLabel htmlFor="search">Recherche</FormLabel>
                    <Input
                      id="search"
                      className="col-span-2 h-8"
                      value={form.data.search}
                      onChange={(event) => form.setData('search', event.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <FormLabel htmlFor="sort">Trier par</FormLabel>
                    <Select
                      value={form.data.sort}
                      onValueChange={(value) => form.setData('sort', value)}
                    >
                      <SelectTrigger id="sort" className="h-8 w-full col-span-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {sortOptions.map((option) => (
                            <SelectItem value={option.value} key={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <FormLabel>Critère</FormLabel>
                    <Button
                      type="button"
                      onClick={onCopy}
                      variant="outline"
                      size="sm"
                      className="group col-span-2"
                      asChild
                    >
                      <button>
                        <span className="group-hover:hidden">@p:{player.username}</span>
                        <span className="hidden group-hover:inline">Copier</span>
                      </button>
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {data.length !== 0 ? (
          <ScrollArea className="h-[256px]">
            <Table>
              <TableBody>
                {data.map((entry) => (
                  <TableRow key={entry.createdAt}>
                    <TableCell className="flex items-center gap-2">
                      <Avatar className="rounded-none">
                        <AvatarImage
                          src={getMinecraftItemUrl(`${entry.item.name}:${entry.item.meta}`)}
                          alt={entry.name}
                          style={{ imageRendering: 'pixelated' }}
                          className="rounded-[inherit] h-8 w-auto object-contain"
                        />
                        <AvatarFallback className="dark:bg-inherit bg-inherit">
                          <QuestionIcon className="size-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1.5">
                        <p className="text-xs font-pixel truncate">
                          {removeColorCodes(entry.name)}
                        </p>
                        <p className="text-xs">
                          {formatDate(
                            DateTime.fromMillis(entry.createdAt).toISO()!,
                            DateTime.DATE_SHORT
                          )}{' '}
                          · Expire {DateTime.fromMillis(entry.expireAt).toRelative()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-pixel text-xs">
                      <span>{entry.type !== 'LUCKY_DRAWER' && `x${entry.item.quantity}`}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row flex-wrap justify-end gap-1">
                        {entry.pricePb !== 0 && (
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <Badge
                                className="text-xs font-pixel min-w-20 justify-between rounded"
                                variant="outline"
                              >
                                <MarketPbIcon className="w-4" />
                                {formatNumber(entry.pricePb, { roundingMode: 'floor' })}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              {formatNumber(entry.pricePb, { notation: 'standard' })} PB
                            </TooltipContent>
                          </Tooltip>
                        )}
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <Badge
                              className="text-xs font-pixel min-w-20 justify-between rounded"
                              variant="outline"
                            >
                              <MarketMoneyIcon className="w-4" />
                              {formatNumber(entry.price, { roundingMode: 'floor' })}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            {formatPrice(entry.price, { notation: 'standard' })}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        ) : (
          <p className="text-center p-4">Aucun élément trouvé</p>
        )}
      </CardContent>
    </Card>
  )
}
