import type BossController from '#leaderboard/controllers/boss_controller'
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
import DefaultLayout from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { Head } from '~/components/shared/head'
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
  PodiumCardValue,
  PodiumCardWrapper,
} from '../components/podium_card'
import { BossIcon } from '~/components/icons'

type BossIndexProps = InferPageProps<BossController, 'index'>

export default function BossIndex(props: BossIndexProps) {
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
      <Head descriptors={[{ title: 'Leaderboard: Boss' }]} />
      <DefaultLayout>
        <Page>
          <PageTitle>Leaderboard: Boss</PageTitle>
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
  compare,
}: {
  data: BossIndexProps['leaderboard'][number]['data'][number]
  position: 'first' | 'second' | 'third'
  compare?: number
}) => {
  return (
    <PodiumCard position={position}>
      <PodiumCardImage src={getHeadUrl(data.username)} alt={`${data.username}'s avatar`} />
      <PodiumCardDescription href={`/stats/users/${data.username}`}>
        {data.username}
      </PodiumCardDescription>
      <PodiumCardValue after={<BossIcon className="h-5 w-auto" />}>{data.value}</PodiumCardValue>
      {compare && <PodiumCardCompare value={data.value} compare={compare} />}
    </PodiumCard>
  )
}
