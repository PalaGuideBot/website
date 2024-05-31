import type MoneyController from '#leaderboard/controllers/money_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
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
import DefaultLayout from '~/components/layouts/default'
import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { graphColors } from '~/content/leaderboards'
import { usePagination } from '~/hooks/use_pagination'
import { GraphTooltip } from '../components/graph_tooltip'
import { Pagination } from '../components/pagination'
import { PodiumCard, PodiumCardDescription, PodiumCardValue } from '../components/podium_card'
import { formatNumber, formatPrice } from '~/lib/utils'

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
        <div className="mx-auto w-full max-w-4xl flex flex-col gap-4">
          <h1 className="text-lg font-medium">Leaderboard: Money</h1>
          <h2 className="font-pixel">Podium</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Podium data={first} position="first" />
            <Podium data={second} position="second" />
            <Podium data={third} position="third" />
          </div>
          <h2 className="font-pixel">Historique</h2>
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
        </div>
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
    <PodiumCard position={position}>
      <img
        src={`https://mc-heads.net/avatar/${data.username}/100`}
        alt={`${data.username}'s avatar`}
        className="object-contain"
      />
      <PodiumCardDescription>{data.username}</PodiumCardDescription>
      <PodiumCardValue className="border-b-2 border-dashed border-foreground">
        <span>{formatNumber(data.value)}</span>
      </PodiumCardValue>
    </PodiumCard>
  )
}
