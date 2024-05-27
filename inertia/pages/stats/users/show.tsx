import type UsersController from '#stats/controllers/users_controller'
import strings from '@adonisjs/core/helpers/string'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, router, usePage } from '@inertiajs/react'
import { Button, ToggleGroup } from '@lemonsqueezy/wedges'
import { SearchIcon, TriangleAlertIcon } from 'lucide-react'
import { FormEvent, useState } from 'react'
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
import { ArrowRightIcon } from '~/components/icons'
import DefaultLayout from '~/components/layouts/default'
import PaladiumJob from '~/components/shared/paladium_job'
import PaladiumRank from '~/components/shared/paladium_rank'
import ReactSkinview3d from '~/components/skin_viewer_3d'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import Input from '~/components/ui/input'
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
import { formatDate } from '~/lib/date'
import { formatDuration, formatNumber, formatPrice } from '~/lib/utils'
import type { Job } from '~/types'

type UserShowProps = InferPageProps<UsersController, 'show'>

export default function UserShow(props: UserShowProps) {
  const { user, exampleUser } = props
  const {
    props: { error },
  } = usePage<{ error?: string }>()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    router.visit(`/stats/users/${username}`, {
      preserveState: true,
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    })
  }

  return (
    <>
      <Head title={user?.username || 'Utilisateur'} />
      <DefaultLayout>
        <div className="mx-auto w-full max-w-4xl flex flex-col gap-4">
          <h1 className="text-lg font-medium">Statistiques utilisateur</h1>
          <form onSubmit={onSubmit}>
            <div className="flex">
              <Input
                className="rounded-r-none w-full"
                placeholder="Pseudo"
                name="username"
                defaultValue={user?.username}
                disabled={isLoading}
              />
              <Button
                variant="tertiary"
                className="rounded-l-none w-12"
                disabled={isLoading}
                isIconOnly
              >
                <SearchIcon className="size-4" />
              </Button>
            </div>
          </form>
          {!error && !user && (
            <div className="flex flex-col gap-2 [&>p]:text-sm xs:[&>p]:text-base">
              <h2 className="text-sm font-mc-dungueons">Informations</h2>
              <p>
                Pour commencer à voir les statistiques, tapez le pseudo d'un joueur sur la barre de
                recherche au-dessus.
              </p>
              <p>
                Cet outil permet d'afficher les statistiques avancées d'un utilisateur jouant à
                Paladium. On y retrouve des statistiques telles que l'évolution des niveaux de
                métier, l'argent, et le temps de jeu.
              </p>
              <p>
                On a également l'historique de sa faction et de son rang. Toutes ces informations
                seront présentées sous forme d'une page intuitive et facile à lire.
              </p>
              {exampleUser && (
                <>
                  <p>Un exemple d'utilisateur est disponible juste en dessous.</p>
                  <h2 className="mt-2 text-sm font-mc-dungueons">Exemple</h2>
                  <UserDetails user={exampleUser} />
                </>
              )}
            </div>
          )}
          {error && !user && (
            <div className="flex flex-col gap-4 items-center justify-center">
              <TriangleAlertIcon className="size-20 animate-blink" />
              <span className="font-pixel animate-blink">Une erreur est survenue</span>
              <span className="font-bold text-lg text-destructive">{error}</span>
            </div>
          )}
          {user && <UserDetails user={user} />}
        </div>
      </DefaultLayout>
    </>
  )
}

type UserDetailsProps = {
  user: NonNullable<UserShowProps['user']>
}

const UserDetails = ({ user }: UserDetailsProps) => {
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
          period: `${formatDate(date, 'PP')} au ${formatDate(date, 'PP')}`,
          faction: faction,
        })
      } else {
        lastHistory.period = `${formatDate(date, 'PP')} au ${lastHistory.period.split(' au ')[1]}`
      }

      return history
    },
    []
  )

  const rankHistory = sortedUserData.reduce((history: { period: string; rank: string }[], data) => {
    const { rank, date } = {
      rank: data.data.rank,
      date: data.date,
    }

    const lastHistory = history[history.length - 1]

    if (!lastHistory || lastHistory.rank !== rank) {
      history.push({
        period: `${formatDate(date, 'PP')} au ${formatDate(date, 'PP')}`,
        rank: rank === 'default' ? 'Joueur' : rank,
      })
    } else {
      lastHistory.period = `${formatDate(date, 'PP')} au ${lastHistory.period.split(' au ')[1]}`
    }

    return history
  }, [])

  const timePlayedHistory = sortedUserData
    .reverse()
    .reduce((history: { date: string; timePlayed: number; difference: number }[], data) => {
      const { date } = {
        date: data.date,
      }

      const lastHistory = history[history.length - 1]

      if (!lastHistory) {
        history.push({
          date: date,
          timePlayed: data.data.timePlayed,
          difference: 0,
        })
      } else {
        history.push({
          date: date,
          timePlayed: data.data.timePlayed,
          difference: data.data.timePlayed - lastHistory.timePlayed,
        })
      }

      return history
    }, [])

  sortedUserData.reverse()

  const lastUserData = sortedUserData.at(0)

  return (
    <div className="flex flex-col gap-4">
      <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-4">
        <Card className="flex flex-col lg:row-span-2">
          <CardHeader className="border-b">
            <CardTitle className="text-center font-pixel">{user.username}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex-1 flex justify-center">
            <ReactSkinview3d
              className="!h-auto max-w-full"
              width="278"
              height="450"
              skinUrl={`https://mineskin.eu/skin/${user.username}`}
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
                  label="Première connexion"
                  value={formatDate(new Date(user.firstJoin), 'PP')}
                />
              </li>
              <li>
                <InformationLine
                  label="Rank"
                  value={
                    <PaladiumRank
                      rank={
                        lastUserData!.data.rank === 'default' ? 'Joueur' : lastUserData!.data.rank
                      }
                    />
                  }
                />
              </li>
              <li>
                <InformationLine
                  label="Faction"
                  value={lastUserData!.data.faction || 'Wilderness'}
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
            </ul>
          </CardContent>
        </Card>
        <Card className="flex lg:col-span-2">
          <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center flex-1 pt-4">
            {Object.entries(lastUserData!.data.jobs)
              .reverse()
              .map(([job, info]) => (
                <PaladiumJob key={job} job={job} info={info} />
              ))}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="border-b flex flex-row items-center justify-between py-2">
          <CardTitle>&Eacute;volution des métiers</CardTitle>
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
                          <div className="font-pixel text-xs">{formatDate(label, 'PP')}</div>
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
              {Object.keys(user.data[0].data.jobs)
                .reverse()
                .map((job) => (
                  <Line
                    key={job}
                    type="monotone"
                    dataKey={`data.jobs.${job}.${graphType}`}
                    name={job}
                    stroke={`var(--job-${job})`}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>&Eacute;volution du temps de jeu</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart height={200} data={timePlayedHistory}>
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
                    const { difference, timePlayed } = payload[0].payload
                    return (
                      <Card className="bg-background">
                        <CardContent className="p-4 space-y-2">
                          <div className="font-pixel text-xs">{formatDate(label, 'PP')}</div>
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center">
                              <span className="text-sm">Temps de jeu: </span>
                              <span className="text-sm font-bold">
                                {formatDuration(timePlayed)}
                              </span>
                            </div>
                            <div className="flex gap-2 items-center">
                              <span className="text-sm">Différence: </span>
                              <span className="text-sm font-bold">
                                {formatNumber(difference, {
                                  notation: 'standard',
                                  maximumFractionDigits: 2,
                                })}{' '}
                                minutes
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="difference"
                name="Différence de temps de jeu"
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>&Eacute;volution de l'argent</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart height={200} data={sortedUserData.toReversed()}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis
                className="text-xs"
                tickFormatter={(value) => formatPrice(Number(value))}
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
              <Line
                type="monotone"
                dataKey="data.money"
                name="Argent"
                stroke="#82ca9d"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Classements</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(user.leaderboard)
            .filter(([key]) => !['corruption'].includes(key))
            .map(([key, value]) => {
              const Icon = leaderboardIcons[key as keyof typeof leaderboardIcons]
              return (
                <div
                  key={key}
                  className="flex gap-4 border p-4 bg-background/50 rounded-md hover:bg-background/30"
                >
                  {Icon && <Icon className="w-12 invert-0" />}
                  <div className="flex flex-col gap-2">
                    <span className="font-pixel">{strings.noCase(key)}</span>
                    <span className="text-sm text-primary font-mc-dungueons">
                      # {formatNumber(value, { notation: 'standard' })}
                    </span>
                  </div>
                </div>
              )
            })}
        </CardContent>
      </Card>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4">
          <Card className="flex-1 min-w-[300px]">
            <CardHeader className="border-b">
              <CardTitle>Historique des factions</CardTitle>
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
                      <TableCell>{entry.faction}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="flex-1 min-w-[300px]">
            <CardHeader className="border-b">
              <CardTitle>Historique des rangs</CardTitle>
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

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Historique des données</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="text-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead>Faction</TableHead>
                <TableHead>Money</TableHead>
                <TableHead>Temps de jeu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user.data.map((data) => (
                <TableRow key={data.date}>
                  <TableCell>{formatDate(data.date, 'PP')}</TableCell>
                  <TableCell>
                    <PaladiumRank rank={data.data.rank} className="text-xs" />
                  </TableCell>
                  <TableCell>{data.data.faction || 'Wilderness'}</TableCell>
                  <TableCell>{formatPrice(data.data.money)}</TableCell>
                  <TableCell>{formatDuration(data.data.timePlayed)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

const InformationLine = ({
  label,
  value,
}: {
  label: string
  value: string | number | React.ReactNode
}) => {
  return (
    <div className="flex gap-2">
      <span className="font-pixel">{label}</span>
      <ArrowRightIcon className="w-2" />
      {typeof value === 'string' || typeof value === 'number' ? (
        <span className="text-sm font-mc-dungueons">{value}</span>
      ) : (
        value
      )}
    </div>
  )
}
