import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'
import { Alert } from '@lemonsqueezy/wedges'
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

import type MoneyController from '#leaderboard/controllers/money_controller'
import DefaultLayout from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { DateRangeSelector } from '~/components/shared/date_range_selector'
import { Head } from '~/components/shared/head'
import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { graphColors } from '~/content/leaderboards'
import { usePagination } from '~/hooks/use_pagination'
import { getHeadUrl } from '~/lib/minecraft'
import { formatNumber, formatPrice } from '~/lib/utils'
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

type MoneyIndexProps = InferPageProps<MoneyController, 'index'>

export default function MoneyIndex(props: MoneyIndexProps) {
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
      <Head descriptors={[{ title: 'Classement: Money' }]} />
      <DefaultLayout>
        <Page>
          <div className="flex flex-row flex-wrap gap-2 justify-between items-center">
            <PageTitle>Classement: Money</PageTitle>
            <DateRangeSelector seasons={seasons} defaultOptions={options} />
          </div>
          {!lastLeaderboard && (
            <Alert color="warning">Aucune donnée trouvée pour la période sélectionnée</Alert>
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
                            valueFormatter={(value) => formatPrice(Number(value))}
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
  data: MoneyIndexProps['leaderboard'][number]['data'][number]
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
              <PodiumCardValue className="border-b-2 border-dashed border-foreground hover:border-b-transparent">
                {formatPrice(data.value, { notation: 'compact' })}
              </PodiumCardValue>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {formatPrice(data.value, { compactDisplay: 'long' })}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {Number(compare) > 0 && <PodiumCardCompare value={data.value} compare={Number(compare)} />}
      </PodiumCardPedestal>
    </PodiumCard>
  )
}
