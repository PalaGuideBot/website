import type DashboardController from '#staff/controllers/dashboard_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Avatar, Badge, Tabs } from '@lemonsqueezy/wedges'
import { CalendarDaysIcon, CodeXmlIcon, PointerIcon, ServerIcon, UsersIcon } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { DiscordIcon } from '~/components/icons'
import StaffLayout from '~/components/layouts/staff'
import { Page, PageTitle } from '~/components/page'
import { Head } from '~/components/shared/head'
import LinearGradient from '~/components/shared/linear_gradient'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { ScrollArea } from '~/components/ui/scroll_area'
import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table'
import { graphColors } from '~/content/leaderboards'
import { formatDate } from '~/lib/date'
import { formatNumber } from '~/lib/utils'
import {
  StatCard,
  StatCardChange,
  StatCardContent,
  StatCardHeader,
  StatCardTitle,
  StatCardValue,
} from '../components/stat_card'

type DashboardIndexPageProps = InferPageProps<DashboardController, 'index'>

export default function DashboardIndexPage(props: DashboardIndexPageProps) {
  const { stats } = props
  const lastDate = stats.at(0)?.date ?? new Date()
  return (
    <>
      <Head title="Tableau de bord" />
      <StaffLayout>
        <Page>
          <PageTitle>Tableau de bord</PageTitle>
          <Tabs defaultValue="discord" variant="fill">
            <Tabs.List className="flex flex-col-reverse items-start justify-between gap-2 md:flex-wrap-reverse md:flex-row md:items-center">
              <div className="flex items-center gap-2">
                <Tabs.Trigger before={<DiscordIcon className="size-4" />} value="discord">
                  Discord
                </Tabs.Trigger>
                <Tabs.Trigger before={<CodeXmlIcon className="size-4" />} value="api">
                  API
                </Tabs.Trigger>
              </div>
              <Badge before={<CalendarDaysIcon />} stroke>
                {formatDate(lastDate, 'PP')}
              </Badge>
            </Tabs.List>
            <Tabs.Content value="discord">
              <DiscordTab data={stats} />
            </Tabs.Content>
            <Tabs.Content value="api">
              <ApiTab data={stats} />
            </Tabs.Content>
          </Tabs>
        </Page>
      </StaffLayout>
    </>
  )
}

const DiscordTab = ({ data }: { data: DashboardIndexPageProps['stats'] }) => {
  const [today, yesterday] = data

  const icons = {
    Serveurs: ServerIcon,
    Utilisateurs: UsersIcon,
    Interactions: PointerIcon,
  }

  const interactions = Array.from(
    new Set(data.flatMap((item) => item.interactions.map((interaction) => interaction.name)))
  )

  const interactionsGraphData = data.toReversed().map((item) => {
    return {
      date: item.date,
      ...interactions.reduce(
        (acc, interaction) => {
          const target = item.interactions.find((i) => i.name === interaction)
          acc[interaction] = target?.count ?? 0
          return acc
        },
        {} as Record<string, number>
      ),
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <StatCard>
          <StatCardHeader>
            <StatCardTitle>Serveurs</StatCardTitle>
            <icons.Serveurs className="size-4" />
          </StatCardHeader>
          <StatCardContent>
            <StatCardValue>
              {formatNumber(today.guildsCount, { notation: 'standard' })}
            </StatCardValue>
            <StatCardChange value={today.guildsCount} compare={yesterday.guildsCount} />
          </StatCardContent>
        </StatCard>
        <StatCard>
          <StatCardHeader>
            <StatCardTitle>Utilisateurs</StatCardTitle>
            <icons.Utilisateurs className="size-4" />
          </StatCardHeader>
          <StatCardContent>
            <StatCardValue>
              {formatNumber(today.usersCount, { notation: 'standard' })}
            </StatCardValue>
            <StatCardChange value={today.usersCount} compare={yesterday.usersCount} />
          </StatCardContent>
        </StatCard>
        <StatCard>
          <StatCardHeader>
            <StatCardTitle>Interactions</StatCardTitle>
            <icons.Interactions className="size-4" />
          </StatCardHeader>
          <StatCardContent>
            <StatCardValue>
              {formatNumber(today.interactionsCount, { notation: 'standard' })}
            </StatCardValue>
            <StatCardChange value={today.interactionsCount} compare={yesterday.interactionsCount} />
          </StatCardContent>
        </StatCard>
      </div>
      <Card className="bg-backgroud">
        <CardHeader className="border-b">
          <CardTitle>&Eacute;volution</CardTitle>
        </CardHeader>
        <CardContent className="p-4 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data.toReversed().map((item) => ({
                date: item.date,
                guildsCount: item.guildsCount,
                usersCount: item.usersCount,
                interactionsCount: item.interactionsCount,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis
                className="text-xs"
                tickFormatter={(value) => formatNumber(Number(value))}
                orientation="right"
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <Card className="bg-background/95">
                        <CardContent className="p-4 space-y-2">
                          <div className="font-pixel text-xs">{formatDate(label, 'PP')}</div>
                          <div className="flex flex-col gap-2">
                            {payload.map(({ name, value }) => {
                              const Icon = icons[name as keyof typeof icons]
                              return (
                                <div key={name} className="flex gap-2 items-center">
                                  <span className="text-sm">
                                    <Icon className="size-4 mr-2 inline-block" />
                                    {name}
                                  </span>
                                  <span className="text-sm font-bold">
                                    {formatNumber(Number(value), {
                                      notation: 'standard',
                                      maximumFractionDigits: 2,
                                    })}
                                  </span>
                                </div>
                              )
                            })}
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
                dataKey="guildsCount"
                name="Serveurs"
                fill="url(#guilds-gradient)"
                stroke={graphColors[3]}
                strokeWidth={3}
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="usersCount"
                name="Utilisateurs"
                fill="url(#users-gradient)"
                stroke={graphColors[1]}
                strokeWidth={3}
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="interactionsCount"
                name="Interactions"
                fill="url(#interactions-gradient)"
                stroke={graphColors[9]}
                strokeWidth={3}
                dot={false}
              />
              <defs>
                <LinearGradient id="guilds-gradient" from={graphColors[3]} />
                <LinearGradient id="users-gradient" from={graphColors[1]} />
                <LinearGradient id="interactions-gradient" from={graphColors[9]} />
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="bg-backgroud">
        <CardHeader className="border-b">
          <CardTitle>Intéractions</CardTitle>
        </CardHeader>
        <CardContent className="p-4 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={interactionsGraphData}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis
                className="text-xs"
                tickFormatter={(value) => formatNumber(Number(value))}
                orientation="right"
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <Card className="bg-background/95">
                        <CardContent className="p-4 space-y-2">
                          <div className="font-pixel text-xs">{formatDate(label, 'PP')}</div>
                          <div className="flex flex-col gap-2">
                            {payload.map(({ name, value }) => {
                              return (
                                <div key={name} className="flex gap-2 items-center">
                                  <span className="text-sm">{name}</span>
                                  <span className="text-sm font-bold">
                                    {formatNumber(Number(value), {
                                      notation: 'standard',
                                      maximumFractionDigits: 2,
                                    })}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              {Array.from(interactions).map((interaction) => (
                <Line
                  key={interaction}
                  type="monotone"
                  dataKey={interaction}
                  name={interaction}
                  stroke="hsl(var(--wg-primary))"
                  strokeWidth={2}
                  dot={false}
                />
              ))}
              <defs>
                <LinearGradient id="guilds-gradient" from={graphColors[3]} />
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="bg-background">
        <CardHeader className="border-b">
          <CardTitle>Serveurs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[570px]">
            <Table>
              <TableBody>
                {today.guilds.map((guild) => (
                  <TableRow key={guild.id}>
                    <TableCell className="flex items-center gap-2">
                      <Avatar src={guild.icon} alt={`Icône de ${guild.name}`} />
                      <span>{guild.name}</span>
                    </TableCell>
                    <TableCell>
                      <UsersIcon className="size-4 inline-block mr-2" />
                      {formatNumber(guild.memberCount, { notation: 'standard' })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

const ApiTab = ({ data }: { data: DashboardIndexPageProps['stats'] }) => {
  return (
    <div>
      <h1>API</h1>
    </div>
  )
}
