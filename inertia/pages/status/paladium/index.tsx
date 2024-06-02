import type PaladiumController from '#status/controllers/paladium_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import { Tabs, Tooltip as WedgesTooltip } from '@lemonsqueezy/wedges'
import { EarthIcon, FileCogIcon, UsersIcon } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import DefaultLayout from '~/components/layouts/default'
import { Page, PageSubTitle, PageTitle } from '~/components/page'
import LinearGradient from '~/components/shared/linear_gradient'
import { Card, CardContent } from '~/components/ui/card'
import { eachHourOfDate, formatDate } from '~/lib/date'
import { formatNumber } from '~/lib/utils'
import { isSameHour } from 'date-fns'

type PaladiumStatusPageProps = InferPageProps<PaladiumController, 'index'>

export default function PaladiumStatusPage(props: PaladiumStatusPageProps) {
  const { status } = props

  const globalStatus = status.map((s) => ({
    date: s.timestamp,
    status: s.data.java.factions.Manashino,
  }))

  return (
    <>
      <Head title="Status Paladium" />
      <DefaultLayout>
        <Page>
          <PageTitle>Status: Paladium</PageTitle>
          {/* <pre>{JSON.stringify(status[0], null, 1)}</pre> */}
          <p>
            Sur cette page, vous pourrez visualiser le status des différents services de Paladium.
          </p>
          <Tabs defaultValue="global" variant="underlined">
            <Tabs.List>
              <Tabs.Trigger before={<EarthIcon className="size-4" />} value="global">
                Global
              </Tabs.Trigger>
              <Tabs.Trigger before={<UsersIcon className="size-4" />} value="factions">
                Factions
              </Tabs.Trigger>
              <Tabs.Trigger before={<FileCogIcon className="size-4" />} value="launcher">
                Launcher
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="global">
              <Card>
                <CardContent className="pt-4 flex flex-col gap-4">
                  <div className="space-y-2">
                    <PageSubTitle>Uptime</PageSubTitle>
                    <UptimeIndicator data={globalStatus} />
                  </div>
                  <div className="space-y-2">
                    <PageSubTitle>Joueurs</PageSubTitle>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={status}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <XAxis
                            dataKey="timestamp"
                            tickFormatter={(value) => formatDate(value, 'dd/MM/yyyy')}
                            className="text-xs"
                          />
                          <YAxis className="text-xs" orientation="right" />
                          <Tooltip
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                const {
                                  data: {
                                    java: {
                                      global: { players },
                                    },
                                  },
                                } = payload[0].payload
                                return (
                                  <Card className="bg-background">
                                    <CardContent className="p-4 space-y-2">
                                      <div className="font-pixel text-xs">
                                        {formatDate(label, 'PPpp')}
                                      </div>
                                      <div className="flex flex-col gap-2">
                                        <div className="flex gap-2 items-center">
                                          <span className="text-sm">Joueurs: </span>
                                          <span className="text-sm font-bold">
                                            {formatNumber(players)}
                                          </span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                )
                              }
                              return null
                            }}
                          />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="data.java.global.players"
                            name="Joueurs"
                            stroke="hsl(var(--wg-primary))"
                            fill="url(#primary-gradient)"
                            strokeWidth={3}
                            dot={false}
                          />
                          <defs>
                            <LinearGradient id="primary-gradient" from="hsl(var(--wg-primary))" />
                          </defs>
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Tabs.Content>
            <Tabs.Content value="factions">Not implemented yet</Tabs.Content>
            <Tabs.Content value="launcher">Not implemented yet</Tabs.Content>
          </Tabs>
        </Page>
      </DefaultLayout>
    </>
  )
}

const UptimeIndicator = ({
  data,
}: {
  data: Array<{
    date: string
    status:
      | 'online'
      | 'offline'
      | 'maintenance'
      | 'running'
      | 'starting'
      | 'restarting'
      | 'stopping'
  }>
}) => {
  const groupedByHour = eachHourOfDate(new Date()).map((date) => {
    return {
      date: date.toISOString(),
      status: data.filter((s) => isSameHour(date, s.date)),
    }
  })

  return (
    <div className="h-5 bg-surface rounded-md w-full flex flex-row gap-0.5">
      {groupedByHour.map(({ date, status }) => {
        if (status.some((s) => !['online', 'running'].includes(s.status))) {
          return (
            <WedgesTooltip
              color="secondary"
              side="bottom"
              content={
                <ul className="space-y-2 list-disc list-inside">
                  {status.map((s) => (
                    <li key={s.date}>
                      {formatDate(s.date)} - {s.status}
                    </li>
                  ))}
                </ul>
              }
            >
              <span key={date} className="h-full w-full rounded-sm bg-destructive" />
            </WedgesTooltip>
          )
        }

        return <span key={date} className="h-full w-full rounded-sm bg-wg-green" />
      })}
    </div>
  )
}
