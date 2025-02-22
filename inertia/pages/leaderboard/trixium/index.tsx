import type { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'
import { Alert, Tabs } from '@lemonsqueezy/wedges'
import { ShieldIcon, UserIcon } from 'lucide-react'
import { useMemo } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import type TrixiumController from '#leaderboard/controllers/trixium_controller'
import { LeaderboardTrixiumIcon } from '~/components/icons'
import DefaultLayout from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { DateRangeSelector } from '~/components/shared/date_range_selector'
import { Head } from '~/components/shared/head'
import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { graphColors } from '~/content/leaderboards'
import { usePagination } from '~/hooks/use_pagination'
import { useSearchParams } from '~/hooks/use_search_params'
import { getHeadUrl } from '~/lib/minecraft'
import { formatNumber } from '~/lib/utils'
import { GraphTooltip } from '../components/graph_tooltip'
import { Pagination } from '../components/pagination'
import {
  PodiumCard,
  PodiumCardCompare,
  PodiumCardDescription,
  PodiumCardImage,
  PodiumCardPedestal,
  PodiumCardSkin,
  PodiumCardValue,
  PodiumCardWrapper,
} from '../components/podium_card'
import { usePuzzleStore } from '../stores/use_puzzle_store'

type TrixiumPageProps = InferPageProps<TrixiumController, 'index'>

export default function TrixiumIndex(props: TrixiumPageProps) {
  const { leaderboardFaction, leaderboardPlayer, options, seasons } = props

  const [searchParams, setSearchParams] = useSearchParams({ tab: 'player' })

  const onChangeTab = (value: string) => {
    setSearchParams({ tab: value, ...options })
  }

  return (
    <>
      <Head descriptors={[{ title: 'Classement: Trixium' }]} />
      <DefaultLayout>
        <Page>
          <div className="flex flex-row flex-wrap gap-2 justify-between items-center">
            <PageTitle>Classement: Trixium</PageTitle>
            <DateRangeSelector seasons={seasons} defaultOptions={options} />
          </div>
          <Tabs value={searchParams.get('tab')!} onValueChange={onChangeTab} variant="underlined">
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

  const puzzle = usePuzzleStore()

  const lastLeaderboard = leaderboard.at(-1)

  const [first, second, third] = (lastLeaderboard?.data || []).slice(0, 3)

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
    return (lastLeaderboard?.data || [])
      .slice(pageOffset, page * limit)
      .map((user) => user.username)
  }, [page, limit])

  const onChangePage = (p: number) => {
    puzzle.next(p > page ? 'right' : 'left')
    setPagination((prev) => ({ ...prev, page: p }))
  }

  return (
    <div className="flex flex-col gap-4">
      {!lastLeaderboard && (
        <Alert color="warning">Aucune donnée trouvée pour la période sélectionnée</Alert>
      )}
      {lastLeaderboard && (
        <>
          <PageSubTitle>Podium</PageSubTitle>
          <PodiumCardWrapper>
            <PlayerPodium data={first} position="first" />
            <PlayerPodium data={second} position="second" compare={first.value} />
            <PlayerPodium data={third} position="third" compare={first.value} />
          </PodiumCardWrapper>
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
                  <RechartsTooltip
                    content={
                      <GraphTooltip
                        pageOffset={pageOffset}
                        valueFormatter={(value) =>
                          formatNumber(Number(value), { notation: 'standard' })
                        }
                      />
                    }
                  />
                  <Legend
                    formatter={(value) => (
                      <Link className="hover:underline" href={`/players/${value}`}>
                        {value}
                      </Link>
                    )}
                  />
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
                onChange={onChangePage}
              />
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  )
}

const FactionTab = ({ data: leaderboard }: { data: TrixiumPageProps['leaderboardFaction'] }) => {
  const {
    pagination: { page, limit },
    pageOffset,
    setPagination,
  } = usePagination()

  const lastLeaderboard = leaderboard.at(-1)

  const [first, second, third] = (lastLeaderboard?.data || []).slice(0, 3)

  const graphData = useMemo(() => {
    return leaderboard.map((data) => {
      return {
        date: data.date,
        ...data.data.reduce(
          (acc, faction) => {
            acc[faction.name && faction.name !== 'undefined' ? faction.name : faction.uuid] =
              faction.value
            return acc
          },
          {} as Record<string, number>
        ),
      }
    })
  }, [page, limit])

  const factions = useMemo(() => {
    return (lastLeaderboard?.data || [])
      .slice(pageOffset, page * limit)
      .map((faction) =>
        faction.name && faction.name !== 'undefined' ? faction.name : faction.uuid
      )
  }, [page, limit])

  return (
    <div className="flex flex-col gap-4">
      {!lastLeaderboard && (
        <Alert color="warning">Aucune donnée trouvée pour la période sélectionnée</Alert>
      )}
      {lastLeaderboard && (
        <>
          <PageSubTitle>Podium</PageSubTitle>
          <PodiumCardWrapper>
            <FactionPodium data={first} position="first" />
            <FactionPodium data={second} position="second" compare={first.value} />
            <FactionPodium data={third} position="third" compare={first.value} />
          </PodiumCardWrapper>
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
                  <RechartsTooltip
                    content={
                      <GraphTooltip
                        pageOffset={pageOffset}
                        valueFormatter={(value) =>
                          formatNumber(Number(value), { notation: 'standard' })
                        }
                      />
                    }
                  />
                  <Legend
                    formatter={(value) => (
                      <Link className="hover:underline" href={`/factions/${value}`}>
                        {value}
                      </Link>
                    )}
                  />
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
        </>
      )}
    </div>
  )
}

const PlayerPodium = ({
  data,
  position,
  compare,
}: {
  data: TrixiumPageProps['leaderboardPlayer'][number]['data'][number]
  position: 'first' | 'second' | 'third'
  compare?: number
}) => {
  const puzzle = usePuzzleStore()

  return (
    <PodiumCard position={position}>
      {puzzle.resolved && <PodiumCardSkin username={data.username} />}
      {!puzzle.resolved && (
        <PodiumCardImage src={getHeadUrl(data.username)} alt={`${data.username}'s avatar`} />
      )}
      <PodiumCardPedestal>
        <PodiumCardDescription href={`/players/${data.username}`}>
          {data.username}
        </PodiumCardDescription>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger className="z-[2]">
              <PodiumCardValue
                className="border-b-2 border-dashed border-foreground hover:border-b-transparent"
                after={<LeaderboardTrixiumIcon />}
              >
                {formatNumber(data.value)}
              </PodiumCardValue>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {formatNumber(data.value, { compactDisplay: 'long' })} <span>Trixium</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {Number(compare) > 0 && <PodiumCardCompare value={data.value} compare={Number(compare)} />}
      </PodiumCardPedestal>
    </PodiumCard>
  )
}

const FactionPodium = ({
  data,
  position,
  compare,
}: {
  data: TrixiumPageProps['leaderboardFaction'][number]['data'][number]
  position: 'first' | 'second' | 'third'
  compare?: number
}) => {
  return (
    <PodiumCard position={position}>
      <PodiumCardImage src={`${data.emblemUrl}`} alt={`${data.uuid}'s avatar`} />
      <PodiumCardPedestal>
        <PodiumCardDescription href={`/factions/${data.name}`}>{data.name}</PodiumCardDescription>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger className="z-[2]">
              <PodiumCardValue
                className="border-b-2 border-dashed border-foreground hover:border-b-transparent"
                after={<LeaderboardTrixiumIcon />}
              >
                {formatNumber(data.value)}
              </PodiumCardValue>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {formatNumber(data.value, { compactDisplay: 'long' })} <span>Trixium</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {Number(compare) > 0 && <PodiumCardCompare value={data.value} compare={Number(compare)} />}
      </PodiumCardPedestal>
    </PodiumCard>
  )
}
