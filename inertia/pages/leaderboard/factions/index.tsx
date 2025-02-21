import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'
import { Alert } from '@lemonsqueezy/wedges'
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

import type FactionsController from '#leaderboard/controllers/factions_controller'
import DefaultLayout from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { DateRangeSelector } from '~/components/shared/date_range_selector'
import { Head } from '~/components/shared/head'
import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { graphColors } from '~/content/leaderboards'
import { usePagination } from '~/hooks/use_pagination'
import { GraphTooltip } from '../components/graph_tooltip'
import { Pagination } from '../components/pagination'
import {
  PodiumCard,
  PodiumCardCompare,
  PodiumCardDescription,
  PodiumCardImage,
  PodiumCardPedestal,
  PodiumCardValue,
  PodiumCardWrapper,
} from '../components/podium_card'

type FactionsIndexProps = InferPageProps<FactionsController, 'index'>

export default function FactionsIndex(props: FactionsIndexProps) {
  const { leaderboard, options, seasons } = props
  const {
    pagination: { page, limit },
    pageOffset,
    setPagination,
  } = usePagination()

  const lastLeaderboard = leaderboard.at(-1)

  const [first, second, third] = (lastLeaderboard?.data ?? []).slice(0, 3)

  const graphData = useMemo(() => {
    return leaderboard
      .filter((value) => value.data.length !== 0)
      .map((data) => {
        return {
          date: data.date,
          ...data.data.reduce(
            (acc, user) => {
              acc[user.name] = user.value
              return acc
            },
            {} as Record<string, number>
          ),
        }
      })
  }, [page, limit])

  const names = useMemo(() => {
    return (lastLeaderboard?.data || []).slice(pageOffset, page * limit).map((user) => user.name)
  }, [page, limit])

  return (
    <>
      <Head descriptors={[{ title: 'Classement: Factions' }]} />
      <DefaultLayout>
        <Page>
          <div className="flex flex-row flex-wrap gap-2 justify-between items-center">
            <PageTitle>Classement: Factions</PageTitle>
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
                      <YAxis orientation="right" className="text-sm" />
                      <Tooltip content={<GraphTooltip pageOffset={pageOffset} />} />
                      <Legend
                        formatter={(value) => (
                          <Link className="hover:underline" href={`/factions/${value}`}>
                            {value}
                          </Link>
                        )}
                      />
                      {names?.map((name, index) => (
                        <Line
                          key={name}
                          type="monotone"
                          dataKey={name}
                          name={name}
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
                    total={lastLeaderboard?.data.length ?? 0}
                    onChange={(p) => setPagination((prev) => ({ ...prev, page: p }))}
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
  data: FactionsIndexProps['leaderboard'][number]['data'][number]
  position: 'first' | 'second' | 'third'
  compare?: number
}) => {
  return (
    <PodiumCard position={position}>
      <PodiumCardImage src={`${data.emblemUrl}`} alt={`${data.name}'s avatar`} />
      <PodiumCardPedestal>
        <PodiumCardDescription href={`/factions/${data.name}`}>{data.name}</PodiumCardDescription>
        <PodiumCardValue>
          {data.value} <span>Elo</span>
        </PodiumCardValue>
        {compare && <PodiumCardCompare value={data.value} compare={compare} />}
      </PodiumCardPedestal>
    </PodiumCard>
  )
}
