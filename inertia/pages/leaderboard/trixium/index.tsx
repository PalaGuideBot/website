import type TrixiumController from '#leaderboard/controllers/trixium_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import { Tabs } from '@lemonsqueezy/wedges'
import { ShieldIcon, UserIcon } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from '@inertiajs/react'
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
import DefaultLayout from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { graphColors } from '~/content/leaderboards'
import { usePagination } from '~/hooks/use_pagination'
import { getHeadUrl } from '~/lib/minecraft'
import { formatNumber } from '~/lib/utils'
import { GraphTooltip } from '../components/graph_tooltip'
import { Pagination } from '../components/pagination'
import { PodiumCard, PodiumCardDescription, PodiumCardValue } from '../components/podium_card'

type TrixiumPageProps = InferPageProps<TrixiumController, 'index'>

export default function TrixiumIndex(props: TrixiumPageProps) {
  const { leaderboardFaction, leaderboardPlayer } = props
  return (
    <>
      <Head title="Leaderboard: Trixium" />
      <DefaultLayout>
        <Page>
          <PageTitle>Leaderboard: Trixium</PageTitle>
          <Tabs defaultValue="player" variant="underlined">
            <Tabs.List>
              <Tabs.Trigger before={<UserIcon className="size-4" />} value="player">
                Joueur
              </Tabs.Trigger>
              <Tabs.Trigger before={<ShieldIcon className="size-4" />} value="faction">
                Faction
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="player">
              <PlayerTab data={leaderboardPlayer} />
            </Tabs.Content>
            <Tabs.Content value="faction">
              <FactionTab data={leaderboardFaction} />
            </Tabs.Content>
          </Tabs>
        </Page>
      </DefaultLayout>
    </>
  )
}

const PlayerTab = ({ data: leaderboard }: { data: TrixiumPageProps['leaderboardPlayer'] }) => {
  const {
    pagination: { page, limit },
    pageOffset,
    setPagination,
  } = usePagination()

  const lastLeaderboard = leaderboard.at(-1)!

  const [first, second, third] = lastLeaderboard.data.slice(0, 3)

  const graphData = useMemo(() => {
    return leaderboard.map((data) => {
      return {
        date: data.date,
        ...data.data.reduce(
          (acc, user) => {
            acc[user.username] = user.value
            return acc
          },
          {} as Record<string, number>
        ),
      }
    })
  }, [page, limit])

  const usernames = useMemo(() => {
    return lastLeaderboard.data.slice(pageOffset, page * limit).map((user) => user.username)
  }, [page, limit])

  return (
    <div className="flex flex-col gap-4">
      <PageSubTitle>Podium</PageSubTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <PlayerPodium data={first} position="first" />
        <PlayerPodium data={second} position="second" />
        <PlayerPodium data={third} position="third" />
      </div>
      <PageSubTitle>Historique</PageSubTitle>
      <Card>
        <CardContent className="p-4 h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" className="text-sm" />
              <YAxis
                orientation="right"
                className="text-sm"
                tickFormatter={(value) => formatNumber(value)}
              />
              <Tooltip
                content={
                  <GraphTooltip
                    pageOffset={pageOffset}
                    valueFormatter={(value) =>
                      formatNumber(Number(value), { notation: 'standard' })
                    }
                  />
                }
              />
              <Legend />
              {usernames.map((username, index) => {
                return (
                  <Line
                    key={username}
                    type="monotone"
                    dataKey={username}
                    name={username}
                    stroke={`${graphColors.at(index % graphColors.length)}`}
                    strokeWidth={3}
                    dot={false}
                  />
                )
              })}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-2">
          <Pagination
            page={page}
            limit={limit}
            total={lastLeaderboard.data.length}
            onChange={(p) => setPagination((prev) => ({ ...prev, page: p }))}
          />
        </CardFooter>
      </Card>
    </div>
  )
}

const FactionTab = ({ data: leaderboard }: { data: TrixiumPageProps['leaderboardFaction'] }) => {
  const {
    pagination: { page, limit },
    pageOffset,
    setPagination,
  } = usePagination()

  const lastLeaderboard = leaderboard.at(-1)!

  const [first, second, third] = lastLeaderboard.data.slice(0, 3)

  const graphData = useMemo(() => {
    return leaderboard.map((data) => {
      return {
        date: data.date,
        ...data.data.reduce(
          (acc, faction) => {
            acc[faction.name ? faction.name : faction.uuid] = faction.value
            return acc
          },
          {} as Record<string, number>
        ),
      }
    })
  }, [page, limit])

  const factions = useMemo(() => {
    return lastLeaderboard.data.slice(pageOffset, page * limit).map((faction) => faction.name)
  }, [page, limit])

  return (
    <div className="flex flex-col gap-4">
      <PageSubTitle>Podium</PageSubTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <FactionPodium data={first} position="first" />
        <FactionPodium data={second} position="second" />
        <FactionPodium data={third} position="third" />
      </div>
      <PageSubTitle>Historique</PageSubTitle>
      <Card>
        <CardContent className="p-4 h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" className="text-sm" />
              <YAxis
                orientation="right"
                className="text-sm"
                tickFormatter={(value) => formatNumber(value)}
              />
              <Tooltip
                content={
                  <GraphTooltip
                    pageOffset={pageOffset}
                    valueFormatter={(value) =>
                      formatNumber(Number(value), { notation: 'standard' })
                    }
                  />
                }
              />
              <Legend />
              {factions.map((faction, index) => {
                return (
                  <Line
                    key={faction}
                    type="monotone"
                    dataKey={faction}
                    name={faction}
                    stroke={`${graphColors.at(index % graphColors.length)}`}
                    strokeWidth={3}
                    dot={false}
                  />
                )
              })}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-2">
          <Pagination
            page={page}
            limit={limit}
            total={lastLeaderboard.data.length}
            onChange={(p) => setPagination((prev) => ({ ...prev, page: p }))}
          />
        </CardFooter>
      </Card>
    </div>
  )
}

const PlayerPodium = ({
  data,
  position,
}: {
  data: TrixiumPageProps['leaderboardPlayer'][number]['data'][number]
  position: 'first' | 'second' | 'third'
}) => {
  return (
    <Link href={`/stats/users/${data.username}`} className="block">
      <PodiumCard position={position}>
        <img
          src={getHeadUrl(data.username)}
          alt={`${data.username}'s avatar`}
          className="object-contain"
        />
        <PodiumCardDescription>{data.username}</PodiumCardDescription>
        <PodiumCardValue className="border-b-2 border-dashed border-foreground">
          <span>{formatNumber(data.value)}</span>
        </PodiumCardValue>
      </PodiumCard>
    </Link>
  )
}

const FactionPodium = ({
  data,
  position,
}: {
  data: TrixiumPageProps['leaderboardFaction'][number]['data'][number]
  position: 'first' | 'second' | 'third'
}) => {
  return (
    <Link href={`/stats/factions/${data.name}`} className="block">
      <PodiumCard position={position}>
        <img
          src={`${data.emblemUrl}`}
          alt={`${data.uuid}'s avatar`}
          className="object-contain h-auto w-[100px]"
        />
        <PodiumCardDescription>{data.name}</PodiumCardDescription>
        <PodiumCardValue className="border-b-2 border-dashed border-foreground">
          <span>{formatNumber(data.value)}</span>
        </PodiumCardValue>
      </PodiumCard>
    </Link>
  )
}
