import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'
import { useMemo } from 'react'
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

import type BossController from '#leaderboard/controllers/boss_controller'
import { BossIcon } from '~/components/icons'
import { DefaultLayout } from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { DateRangeSelector } from '~/components/shared/date_range_selector'
import { Head } from '~/components/shared/head'
import { Alert, AlertDescription } from '~/components/ui/alert'
import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { graphColors } from '~/content/leaderboards'
import { usePagination } from '~/hooks/use_pagination'
import { getHeadUrl } from '~/lib/minecraft'
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
<<<<<<< HEAD
import { SpiderWeb } from '~/components/shared/spider_web'
import { HalloweenEyes } from '~/components/shared/halloween_decorations'
=======
>>>>>>> dev

type BossIndexProps = InferPageProps<BossController, 'index'>

export default function BossIndex(props: BossIndexProps) {
  const { leaderboard, options, seasons } = props
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
    <>
      <Head
        title="Classement: Boss"
        description="Consultez le classement des joueurs qui tuent le plus de boss."
        defaultOg
      />
      <DefaultLayout>
        <Page>
          <div className="flex flex-row flex-wrap gap-2 justify-between items-center">
            <PageTitle>Classement: Boss</PageTitle>
            <DateRangeSelector seasons={seasons} defaultOptions={options} />
          </div>
          {!lastLeaderboard && (
            <Alert variant="warning">
              <AlertDescription>
                Aucune donnée trouvée pour la période sélectionnée.
              </AlertDescription>
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
                      <YAxis orientation="right" className="text-sm" />
                      <Tooltip content={<GraphTooltip pageOffset={pageOffset} />} />
                      <Legend
                        formatter={(value) => (
                          <Link className="hover:underline" href={`/players/${value}`}>
                            {value}
                          </Link>
                        )}
                      />
                      {usernames.map((username, index) => (
                        <Line
                          key={username}
                          type="monotone"
                          dataKey={username}
                          name={username}
                          stroke={`${graphColors.at(index % graphColors.length)}`}
                          strokeWidth={3}
                          dot={false}
                        />
                      ))}
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
        </Page>
      </DefaultLayout>
    </>
  )
}

const Podium = ({
  data,
  position,
  compare,
}: {
  data: BossIndexProps['leaderboard'][number]['data'][number]
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
        <PodiumCardValue after={<BossIcon className="h-5 w-auto invert dark:invert-0" />}>
          {data.value}
        </PodiumCardValue>
        {Number(compare) > 0 && <PodiumCardCompare value={data.value} compare={Number(compare)} />}
      </PodiumCardPedestal>
    </PodiumCard>
  )
}
