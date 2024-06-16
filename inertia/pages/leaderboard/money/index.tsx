import type MoneyController from '#leaderboard/controllers/money_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, Link } from '@inertiajs/react'
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
import DefaultLayout from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { graphColors } from '~/content/leaderboards'
import { usePagination } from '~/hooks/use_pagination'
import { getHeadUrl } from '~/lib/minecraft'
import { formatNumber, formatPrice } from '~/lib/utils'
import { GraphTooltip } from '../components/graph_tooltip'
import { Pagination } from '../components/pagination'
import { PodiumCard, PodiumCardDescription, PodiumCardValue } from '../components/podium_card'

type MoneyIndexProps = InferPageProps<MoneyController, 'index'>

export default function MoneyIndex(props: MoneyIndexProps) {
  const { leaderboard } = props
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
    <>
      <Head title="Leaderboard: Money" />
      <DefaultLayout>
        <Page>
          <PageTitle>Leaderboard: Money</PageTitle>
          <PageSubTitle>Podium</PageSubTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <Podium data={first} position="first" />
            <Podium data={second} position="second" />
            <Podium data={third} position="third" />
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
                  <RechartsTooltip
                    content={
                      <GraphTooltip
                        pageOffset={pageOffset}
                        valueFormatter={(value) => formatPrice(Number(value))}
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
        </Page>
      </DefaultLayout>
    </>
  )
}

const Podium = ({
  data,
  position,
}: {
  data: MoneyIndexProps['leaderboard'][number]['data'][number]
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
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <PodiumCardValue className="border-b-2 border-dashed border-foreground hover:border-b-0">
                {formatNumber(data.value)}
              </PodiumCardValue>
            </TooltipTrigger>
            <TooltipContent side="bottom">{formatPrice(data.value)}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PodiumCard>
    </Link>
  )
}
