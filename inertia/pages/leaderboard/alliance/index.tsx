import { InferPageProps } from '@adonisjs/inertia/types'
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
import { LeaderboardAllianceIcon } from '~/components/icons'

import type AllianceController from '#leaderboard/controllers/alliance_controller'
import { DefaultLayout } from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import { DateRangeSelector } from '~/components/shared/date_range_selector'
import { Head } from '~/components/shared/head'
import { Alert, AlertDescription } from '~/components/ui/alert'
import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { graphColors } from '~/content/leaderboards'
import { usePagination } from '~/hooks/use_pagination'
import { getHeadUrl } from '~/lib/minecraft'
import { formatNumber } from '~/lib/utils'
import { usePuzzleStore } from '~/pages/leaderboard/stores/use_puzzle_store'
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
import { HalloweenEyes } from '~/components/shared/halloween_decorations'
import { SpiderWeb } from '~/components/shared/spider_web'

type AllianceIndexProps = InferPageProps<AllianceController, 'index'>

export default function AllianceIndex(props: AllianceIndexProps) {
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
          (acc, alliance) => {
            acc[alliance.username] = alliance.value
            return acc
          },
          {} as Record<string, number>
        ),
      }
    })
  }, [page, limit])

  const names = useMemo(() => {
    return (lastLeaderboard?.data || [])
      .slice(pageOffset, page * limit)
      .map((alliance) => alliance.username)
  }, [page, limit])

  const onChangePage = (p: number) => {
    puzzle.next(p > page ? 'right' : 'left')
    setPagination((prev) => ({ ...prev, page: p }))
  }

  return (
    <>
      <Head
        title="Classement: Alignement"
        description="Découvrez le classement des alliances sur Paladium en fonction du nombre de chunks contrôlés."
        defaultOg
      />
      <DefaultLayout>
        <SpiderWeb /> {/* Halloween decoration */}
        <Page>
          <div className="flex flex-row flex-wrap gap-2 justify-between items-center">
            <PageTitle>Classement: Alignement</PageTitle>
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
                      <RechartsTooltip content={<GraphTooltip pageOffset={pageOffset} />} />
                      <Legend
                        formatter={(value) => (
                          <Link className="hover:underline" href={`/players/${value}`}>
                            {value}
                          </Link>
                        )}
                      />
                      {names.map((name, index) => (
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
      <HalloweenEyes /> {/* Halloween decoration */}
    </>
  )
}

const Podium = ({
  data,
  position,
  compare,
}: {
  data: AllianceIndexProps['leaderboard'][number]['data'][number]
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
        <Tooltip delayDuration={100}>
          <TooltipTrigger className="z-2">
            <PodiumCardValue
              className="border-b-2 border-dashed border-foreground hover:border-b-transparent"
              after={<LeaderboardAllianceIcon />}
            >
              {formatNumber(data.value)}
            </PodiumCardValue>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {formatNumber(data.value, { notation: 'standard' })} <span>Chunks</span>
          </TooltipContent>
        </Tooltip>
        {Number(compare) > 0 && <PodiumCardCompare value={data.value} compare={Number(compare)} />}
      </PodiumCardPedestal>
    </PodiumCard>
  )
}
