import type PaladiumController from '#status/controllers/paladium_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import { Tabs, ToggleGroup } from '@lemonsqueezy/wedges'
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
import { formatDate } from '~/lib/date'
import { formatNumber } from '~/lib/utils'
import { UptimeIndicator } from '../components/uptime_indicator'
import { useDateIntervalStore } from '../stores/use_date_interval_store'

type PaladiumStatusPageProps = InferPageProps<PaladiumController, 'index'>

export default function PaladiumStatusPage(props: PaladiumStatusPageProps) {
  const { todayStatus, last30daysStatus } = props

  const dateInterval = useDateIntervalStore((state) => state.dateInterval)
  const setDateInterval = useDateIntervalStore((state) => state.setDateInterval)

  let status = []

  switch (dateInterval) {
    case 'today':
      status = todayStatus
      break
    case 'last-30-days':
      status = last30daysStatus
      break
  }

  const globalStatus = status.map((s) => ({
    date: s.timestamp,
    status: s.data.java.global.status,
  }))

  return (
    <>
      <Head title="Status Paladium" />
      <DefaultLayout>
        <Page>
          <PageTitle>Status: Paladium</PageTitle>
          <p>
            Sur cette page, vous pourrez visualiser le status des différents services de Paladium.
          </p>
          <Tabs defaultValue="global" variant="underlined">
            <Tabs.List className="flex items-center justify-between gap-2">
              <div>
                <Tabs.Trigger before={<EarthIcon className="size-4" />} value="global">
                  Global
                </Tabs.Trigger>
                <Tabs.Trigger before={<UsersIcon className="size-4" />} value="factions">
                  Factions
                </Tabs.Trigger>
                <Tabs.Trigger before={<FileCogIcon className="size-4" />} value="launcher">
                  Launcher
                </Tabs.Trigger>
              </div>
              <div>
                <ToggleGroup
                  type="single"
                  size="sm"
                  value={dateInterval}
                  onValueChange={(value) => {
                    if (value.length) {
                      setDateInterval(value as 'last-30-days' | 'today')
                    }
                  }}
                >
                  <ToggleGroup.Item value="last-30-days">30 derniers jours</ToggleGroup.Item>
                  <ToggleGroup.Item value="today">Aujourd'hui</ToggleGroup.Item>
                </ToggleGroup>
              </div>
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
