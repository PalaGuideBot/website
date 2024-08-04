import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'
import { AnimatePresence } from 'framer-motion'
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
  MotionPodiumCardImage,
  PodiumCard,
  PodiumCardCompare,
  PodiumCardDescription,
  podiumCardImageAnimations,
  PodiumCardSkin,
  PodiumCardValue,
  PodiumCardWrapper,
} from '../components/podium_card'
import { usePuzzleStore } from '../stores/use_puzzle_store'

type MoneyIndexProps = InferPageProps<MoneyController, 'index'>

export default function MoneyIndex(props: MoneyIndexProps) {
  const { leaderboard } = props
  const {
    pagination: { page, limit },
    pageOffset,
    setPagination,
  } = usePagination()

  const puzzle = usePuzzleStore()

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

  const onChangePage = (p: number) => {
    puzzle.next(p > page ? 'right' : 'left')
    setPagination((prev) => ({ ...prev, page: p }))
  }

  return (
    <>
      <Head descriptors={[{ title: 'Classement: Money' }]} />
      <DefaultLayout>
        <Page>
          <PageTitle>Classement: Money</PageTitle>
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
                      <Link className="hover:underline" href={`/stats/users/${value}`}>
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
      <AnimatePresence mode="popLayout">
        {!puzzle.resolved && (
          <MotionPodiumCardImage
            initial="initial"
            animate="animate"
            variants={podiumCardImageAnimations}
            src={getHeadUrl(data.username)}
            alt={`${data.username}'s avatar`}
          />
        )}
      </AnimatePresence>
      <PodiumCardDescription href={`/stats/users/${data.username}`}>
        {data.username}
      </PodiumCardDescription>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger className="z-[2]">
            <PodiumCardValue className="border-b-2 border-dashed border-foreground hover:border-b-0">
              {formatPrice(data.value, { notation: 'compact' })}
            </PodiumCardValue>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {formatPrice(data.value, { compactDisplay: 'long' })}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {compare && <PodiumCardCompare value={data.value} compare={compare} />}
    </PodiumCard>
  )
}
