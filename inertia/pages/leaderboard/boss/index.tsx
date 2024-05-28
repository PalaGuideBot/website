import type BossController from '#leaderboard/controllers/boss_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import { Button } from '@lemonsqueezy/wedges'
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
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
import Input from '~/components/ui/input'
import { cn } from '~/lib/utils'

type BossIndexProps = InferPageProps<BossController, 'index'>

export default function BossIndex(props: BossIndexProps) {
  const { leaderboard } = props
  const [{ page, limit }, setPagination] = useState<{ page: number; limit: number }>({
    page: 1,
    limit: 10,
  })
  const sortedLeaderboard = leaderboard.toSorted(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const lastLeaderboard = sortedLeaderboard.at(-1)!

  const [first, second, third] = lastLeaderboard.data.slice(0, 3)

  const graphData = useMemo(() => {
    return leaderboard.map((data) => {
      return {
        date: data.date,
        ...data.data.slice((page - 1) * limit, page * limit).reduce(
          (acc, user) => {
            acc[user.username] = user.value
            return acc
          },
          {} as Record<string, number>
        ),
      }
    })
  }, [page, limit])

  return (
    <>
      <Head title="Leaderboard: Boss" />
      <DefaultLayout>
        <div className="mx-auto w-full max-w-4xl flex flex-col gap-4">
          <h1 className="text-lg font-medium">Leaderboard: Boss</h1>
          <h2 className="font-pixel">Podium</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Podium data={first} position="first" />
            <Podium data={second} position="second" />
            <Podium data={third} position="third" />
          </div>
          <div className="flex gap-2 justify-between items-center">
            <h2 className="font-pixel">Historique</h2>
            <div className="relative">
              <Input placeholder="Rechercher" className="py-1 pl-7" />
              <SearchIcon className="absolute size-4 top-1/2 left-2 transform -translate-y-1/2" />
            </div>
          </div>
          <Card>
            <CardContent className="p-4 h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={graphData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis orientation="right" />
                  <Tooltip />
                  <Legend />
                  {sortedLeaderboard
                    .at(-1)!
                    .data.slice((page - 1) * limit, page * limit)
                    .map((user) => (
                      <Line
                        key={user.username}
                        type="monotone"
                        dataKey={user.username}
                        name={user.username}
                        stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                      />
                    ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex justify-end border-t p-2">
              <Pagination
                page={page}
                limit={limit}
                total={sortedLeaderboard.at(-1)!.data.length}
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
  data: BossIndexProps['leaderboard'][number]['data'][number]
  position: 'first' | 'second' | 'third'
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 items-center border border-b-black/20 border-b-8 rounded-md p-6',
        position === 'first' && 'bg-primary',
        position === 'second' && 'bg-wg-green-400',
        position === 'third' && 'bg-wg-white-400'
      )}
    >
      <img
        src={`https://mc-heads.net/avatar/${data.username}/100`}
        alt={`${data.username}'s avatar`}
        className="object-contain"
      />
      <div className="text-xl font-bold">{data.username}</div>
      <div className="font-mc-dungueons">{data.value}</div>
    </div>
  )
}

const Pagination = ({
  page,
  limit,
  total,
  onChange,
}: {
  page: number
  limit: number
  total: number
  onChange: (page: number) => void
}) => {
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        className="rounded-md"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        isIconOnly
      >
        <ChevronLeftIcon className="size-6" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="rounded-md"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        isIconOnly
      >
        <ChevronRightIcon className="size-6" />
      </Button>
    </div>
  )
}
