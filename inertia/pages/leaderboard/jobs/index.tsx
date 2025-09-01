import type { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'
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

import type JobsController from '#leaderboard/controllers/jobs_controller'
import { DefaultLayout } from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { DateRangeSelector } from '~/components/shared/date_range_selector'
import { Head } from '~/components/shared/head'
import { Alert, AlertDescription } from '~/components/ui/alert'
import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { smallIcons } from '~/content/jobs'
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

type JobsPageProps = InferPageProps<JobsController, 'index'>

const jobs = [
  { value: 'miner', label: 'Miner', Icon: smallIcons.miner },
  { value: 'farmer', label: 'Farmer', Icon: smallIcons.farmer },
  { value: 'hunter', label: 'Hunter', Icon: smallIcons.hunter },
  { value: 'alchemist', label: 'Alchemist', Icon: smallIcons.alchemist },
]

export default function JobsIndex(props: JobsPageProps) {
  const { leaderboard, options, seasons, tab } = props

  const [searchParams, setSearchParams] = useSearchParams({ tab: tab || 'miner' })

  const onChangeTab = (value: string) => {
    setSearchParams({ tab: value, ...options })
  }

  return (
    <>
      <Head
        title="Classement: Métiers"
        description="Consultez le classement des joueurs qui ont le plus de niveau dans un métier."
        defaultOg
      />
      <DefaultLayout>
        <Page>
          <div className="flex flex-row flex-wrap gap-2 justify-between items-center">
            <PageTitle>Classement: Métiers</PageTitle>
            <DateRangeSelector seasons={seasons} defaultOptions={options} />
          </div>
          <Tabs value={searchParams.get('tab')!} onValueChange={onChangeTab}>
            <TabsList className="bg-card text-card-foreground">
              {jobs.map(({ value, label, Icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="dark:data-[state=active]:text-primary data-[state=active]:text-primary"
                >
                  <Icon className="size-4" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <JobTab data={leaderboard} />
        </Page>
      </DefaultLayout>
    </>
  )
}

const JobTab = ({ data: leaderboard }: { data: JobsPageProps['leaderboard'] }) => {
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
        <Alert variant="warning">
          <AlertDescription>Aucune donnée trouvée pour la période sélectionnée.</AlertDescription>
        </Alert>
      )}
      {lastLeaderboard && (
        <>
          <PageSubTitle>Podium</PageSubTitle>
          <PodiumCardWrapper>
            <Podium data={first} position="first" />
            <Podium data={second} position="second" compare={first.value} />
            <Podium data={third} position="third" compare={first.value} />
          </PodiumCardWrapper>
          <PageSubTitle>Historique</PageSubTitle>
          <Card className="pb-2">
            <CardContent className="h-[500px]">
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
            <CardFooter className="justify-center border-t pt-2!">
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

const Podium = ({
  data,
  position,
  compare,
}: {
  data: JobsPageProps['leaderboard'][number]['data'][number]
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
        <PodiumCardValue>LVL. {formatNumber(data.value)}</PodiumCardValue>
        {Number(compare) > 0 && <PodiumCardCompare value={data.value} compare={Number(compare)} />}
      </PodiumCardPedestal>
    </PodiumCard>
  )
}
