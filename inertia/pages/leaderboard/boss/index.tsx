import type BossController from '#leaderboard/controllers/boss_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import DefaultLayout from '~/components/layouts/default'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

export default function BossIndex(props: InferPageProps<BossController, 'index'>) {
  const { leaderboard } = props

  const lastedData = leaderboard[leaderboard.length - 1].data

  const top3 = lastedData.slice(0, 3)
  const graphData = leaderboard.map((data) => ({
    date: data.date,
    ...Object.fromEntries(data.data.map((user) => [user.username, user.value])),
  }))

  return (
    <>
      <Head title="Leaderboard: Boss" />
      <DefaultLayout>
        <div className="mx-auto w-full max-w-4xl flex flex-col gap-4">
          <h1 className="text-lg font-medium">Leaderboard: Boss</h1>

          <Card className="flex flex-col">
            <CardHeader className="border-b">
              <CardTitle>Top 3 Users</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-around p-4">
              {top3.map((user, index) => (
                <div key={user.username} className={`position-${index + 1}`}>
                  <img
                    src={`https://mc-heads.net/avatar/${user.username}/100`}
                    alt={`${user.username}'s avatar`}
                  />
                  <p>{user.username}</p>
                  <p>{user.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b">
              <CardTitle>Leaderboard Chart</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ResponsiveContainer width="100%" height={1000}>
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
                  {lastedData.map((user) => (
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
          </Card>
        </div>
      </DefaultLayout>
    </>
  )
}
