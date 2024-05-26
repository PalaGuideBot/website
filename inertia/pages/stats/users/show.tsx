import type UsersController from '#stats/controllers/users_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, router } from '@inertiajs/react'
import { Button, ToggleGroup } from '@lemonsqueezy/wedges'
import { SearchIcon } from 'lucide-react'
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
import { formatDate } from '~/lib/date'
import { formatDuration, formatNumber, formatPrice } from '~/lib/utils'
import type { Job } from '~/types'

type UserShowProps = InferPageProps<UsersController, 'show'>

export default function UserShow(props: UserShowProps) {
  const { user } = props
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

  const lastUserData = sortedUserData.at(0)

  return (
    <>
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
                  label="Rank"
                  value={<PaladiumRank rank={lastUserData!.data.rank} />}
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
        <CardHeader className="border-b">
          <CardTitle>Historique des données</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
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
      <Card>
        <CardHeader className="border-b flex flex-row items-center justify-between py-2">
          <CardTitle>&Eacute;volution des métiers</CardTitle>
          <ToggleGroup
            type="single"
            defaultValue={graphType}
            onValueChange={(value) => setGraphType(value as 'level' | 'xp')}
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
    </>
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
