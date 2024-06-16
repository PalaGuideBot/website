import type KothController from '#leaderboard/controllers/koth_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
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
import { GraphTooltip } from '../components/graph_tooltip'
import { Pagination } from '../components/pagination'
import { PodiumCard, PodiumCardDescription, PodiumCardValue } from '../components/podium_card'

type KothIndexProps = InferPageProps<KothController, 'index'>

export default function KothIndex(props: KothIndexProps) {
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
      <Head title="Leaderboard: Koth" />
      <DefaultLayout>
        <Page>
          <PageTitle>Leaderboard: Boss</PageTitle>
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
                  <YAxis orientation="right" className="text-sm" />
                  <Tooltip content={<GraphTooltip pageOffset={pageOffset} />} />
                  <Legend
                    formatter={(value) => (
                      <Link className="hover:underline" href={`/stats/users/${value}`}>
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
  data: KothIndexProps['leaderboard'][number]['data'][number]
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
        <PodiumCardValue>{data.value}</PodiumCardValue>
      </PodiumCard>
    </Link>
  )
}
