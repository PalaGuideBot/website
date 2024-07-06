import type PaladiumController from '#status/controllers/paladium_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Tabs, ToggleGroup } from '@lemonsqueezy/wedges'
import { EarthIcon, FileCogIcon, TriangleAlertIcon, UsersIcon } from 'lucide-react'
import { DateTime } from 'luxon'
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
import { Head } from '~/components/shared/head'
import LinearGradient from '~/components/shared/linear_gradient'
import { Card, CardContent } from '~/components/ui/card'
import { icons as factionIcons } from '~/content/factions'
import { formatDate } from '~/lib/date'
import { formatNumber } from '~/lib/utils'
import { PaladiumFaction, PaladiumStatus } from '~/types'
import { UptimeIndicator } from '../components/uptime_indicator'
import { useDateIntervalStore } from '../stores/use_date_interval_store'

type PaladiumStatusPageProps = InferPageProps<PaladiumController, 'index'>

type Status = {
  from: string
  to: string
  status: PaladiumStatus
}

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

  return (
    <>
      <Head descriptors={[{ title: 'Statut: Paladium' }]} />
      <DefaultLayout>
        <Page>
          <PageTitle>Statut: Paladium</PageTitle>
          <p>
            Sur cette page, vous pourrez visualiser le status des différents services de Paladium.
          </p>
          <p className="text-surface-300 text-sm">
            <TriangleAlertIcon className="size-4 mr-2 inline-block" />
            Les données sont mises à jour toutes les 10 minutes, sous réserve de la disponibilité de
            l'API de Paladium.
          </p>
          <Tabs defaultValue="global" variant="underlined">
            <Tabs.List className="flex flex-col-reverse items-start justify-between gap-2 md:flex-wrap-reverse md:flex-row md:items-center">
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
              <GlobalTab
                data={status.map((s) => ({
                  date: s.date,
                  hour: s.hour,
                  global: s.data.java.global,
                }))}
              />
            </Tabs.Content>
            <Tabs.Content value="factions">
              <FactionsTab
                data={status.map((s) => ({
                  date: s.date,
                  factions: s.data.java.factions,
                }))}
              />
            </Tabs.Content>
            <Tabs.Content value="launcher">
              <LauncherTab
                data={status.map((s) => ({ date: s.date, launcher: s.data.launcher }))}
              />
            </Tabs.Content>
          </Tabs>
        </Page>
      </DefaultLayout>
    </>
  )
}

const GlobalTab = ({
  data,
}: {
  data: Array<{
    date: string
    hour?: string
    global: { status: Array<Status>; players: number }
  }>
}) => {
  const dateInterval = useDateIntervalStore((state) => state.dateInterval)

  const globalStatus = data.map((s) => ({
    date: s.date,
    status: s.global.status,
  }))

  const averagePlayers = data.reduce((sum, entry) => sum + entry.global.players, 0) / data.length

  const dataWithAverage = data.map((entry) => ({
    ...entry,
    average: averagePlayers,
  }))

  if (dateInterval === 'last-30-days') dataWithAverage.reverse()

  return (
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
              <AreaChart data={dataWithAverage}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  dataKey={(entry) => `${entry.date}T${entry.hour ?? '00'}:00:00Z`}
                  tickFormatter={(value) =>
                    formatDate(
                      value,
                      dateInterval === 'today' ? DateTime.TIME_WITH_SECONDS : DateTime.DATE_SHORT
                    )
                  }
                  className="text-xs"
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis className="text-xs" orientation="right" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const {
                        date,
                        hour = '00',
                        global: { players },
                        average,
                      } = payload[0].payload
                      return (
                        <Card className="bg-background">
                          <CardContent className="p-4 space-y-2">
                            <div className="font-pixel text-xs">
                              {formatDate(
                                `${date}T${hour}:00:00Z`,
                                dateInterval === 'today'
                                  ? DateTime.DATETIME_MED_WITH_SECONDS
                                  : DateTime.DATE_FULL
                              )}
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex gap-2 items-center">
                                <span className="text-sm">Joueurs: </span>
                                <span className="text-sm font-bold">{formatNumber(players)}</span>
                              </div>
                              <div className="flex gap-2 items-center">
                                <span className="text-sm">Moyenne: </span>
                                <span className="text-sm font-bold">{formatNumber(average)}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    }
                    return null
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="global.players"
                  name="Joueurs"
                  stroke="hsl(var(--wg-primary))"
                  fill="url(#primary-gradient)"
                  strokeWidth={3}
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="average"
                  name="Moyenne"
                  stroke="hsl(var(--wg-secondary))"
                  fill="none"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                />
                <defs>
                  <LinearGradient id="primary-gradient" from="hsl(var(--wg-primary))" />
                </defs>
                <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '50px' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const FactionsTab = ({
  data,
}: {
  data: Array<{ date: string; factions: Record<string, Array<Status>> }>
}) => {
  const groupedByFaction = data.reduce(
    (acc, s) => {
      Object.entries(s.factions).forEach(([faction, status]) => {
        if (!acc[faction]) {
          acc[faction] = []
        }
        acc[faction].push({ date: s.date, status })
      })
      return acc
    },
    {} as Record<string, Array<{ date: string; status: Array<Status> }>>
  )
  return (
    <Card>
      <CardContent className="pt-4 flex flex-col gap-4">
        <div className="space-y-8">
          {Object.entries(groupedByFaction).map(([faction, status]) => {
            const Icon = factionIcons[faction as PaladiumFaction]
            return (
              <div key={faction} className="flex items-end justify-center gap-4 pb-2">
                <Icon className="h-10 w-10 invert-0" />
                <div className="space-y-2 flex-grow">
                  <PageSubTitle>{faction}</PageSubTitle>
                  <UptimeIndicator data={status} />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

const LauncherTab = ({
  data,
}: {
  data: Array<{ date: string; launcher: { status: Array<Status> } }>
}) => {
  return (
    <Card>
      <CardContent className="pt-4 flex flex-col gap-4">
        <div className="space-y-2">
          <PageSubTitle>Uptime</PageSubTitle>
          <UptimeIndicator data={data.map((s) => ({ date: s.date, status: s.launcher.status }))} />
        </div>
      </CardContent>
    </Card>
  )
}
