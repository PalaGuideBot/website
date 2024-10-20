import type DashboardController from '#staff/controllers/dashboard_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Avatar, Badge, Tabs } from '@lemonsqueezy/wedges'
import {
  CalendarDaysIcon,
  CodeXmlIcon,
  CpuIcon,
  HashIcon,
  MemoryStickIcon,
  PointerIcon,
  ServerIcon,
  SwordsIcon,
  TimerIcon,
  UsersIcon,
} from 'lucide-react'
import { DateTime } from 'luxon'
import { useEffect, useMemo, useState } from 'react'
import { DiscordIcon } from '~/components/icons'
import StaffLayout from '~/components/layouts/staff'
import { Page, PageTitle } from '~/components/page'
import { Head } from '~/components/shared/head'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { ScrollArea } from '~/components/ui/scroll_area'
import { Skeleton } from '~/components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table'
import { formatDate, formatDistance } from '~/lib/date'
import { transmit } from '~/lib/transmit'
import { formatNumber } from '~/lib/utils'
import { ServerUsageInfo } from '~/types'
import { ApiDatabaseEvolutionCard } from '../components/api_database_evolution_card'
import {
  ApiStatsEndpointsCard,
  type ApiStatsEndpointsCardProps,
} from '../components/api_stats_endpoints_card'
import { ApiStatsKeysCard, type ApiStatsKeysCardProps } from '../components/api_stats_keys_card'
import { DiscordEvolutionCard } from '../components/discord_evolution_card'
import { DiscordInteractionsCard } from '../components/discord_interactions_card'
import {
  ServerUsageCard,
  ServerUsageCardBadge,
  ServerUsageCardContent,
  ServerUsageCardHeader,
  ServerUsageCardTitle,
  ServerUsageCardValue,
} from '../components/server_usage_card'
import {
  StatCard,
  StatCardChange,
  StatCardContent,
  StatCardHeader,
  StatCardTitle,
  StatCardValue,
} from '../components/stat_card'
import { UsageHistoryCpuCard } from '../components/usage_history_cpu_card'
import { UsageHistoryRamCard } from '../components/usage_history_ram_card'

type DashboardIndexPageProps = InferPageProps<DashboardController, 'index'>

export default function DashboardIndexPage(props: DashboardIndexPageProps) {
  const { stats } = props
  const lastDate = stats.at(0)?.date ?? new Date()

  return (
    <>
      <Head descriptors={[{ title: 'Tableau de bord' }]} />
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
                <Tabs.Trigger before={<ServerIcon className="size-4" />} value="usage">
                  Usage
                </Tabs.Trigger>
              </div>
              <Badge before={<CalendarDaysIcon />} stroke>
                {formatDate(lastDate, DateTime.DATE_MED)}
              </Badge>
            </Tabs.List>
            <Tabs.Content value="discord">
              <DiscordTab data={stats} />
            </Tabs.Content>
            <Tabs.Content value="api">
              <ApiTab data={stats} />
            </Tabs.Content>
            <Tabs.Content value="usage">
              <UsageTab />
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
    Intéractions: PointerIcon,
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
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
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
            <StatCardTitle>Intéractions</StatCardTitle>
            <icons.Intéractions className="size-4" />
          </StatCardHeader>
          <StatCardContent>
            <StatCardValue>
              {formatNumber(today.interactionsCount, { notation: 'standard' })}
            </StatCardValue>
            <StatCardChange value={today.interactionsCount} compare={yesterday.interactionsCount} />
          </StatCardContent>
        </StatCard>
      </div>
      <DiscordEvolutionCard
        data={data
          .toReversed()
          .filter((item) => {
            return Object.values(item).some((value) => Number(value))
          })
          .map((item) => ({
            date: item.date,
            guildsCount: item.guildsCount,
            usersCount: item.usersCount,
            interactionsCount: item.interactionsCount,
          }))}
        icons={icons}
      />
      <DiscordInteractionsCard data={interactionsGraphData} interactions={interactions} />
      <Card className="bg-background">
        <CardHeader className="border-b">
          <CardTitle>Serveurs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[570px]">
            <Table>
              <TableBody>
                {today.guilds
                  .sort((a, b) => b.memberCount - a.memberCount)
                  .map((guild) => (
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
  const [today, yesterday] = data

  const keys = Array.from(new Set(data.flatMap((item) => item.keys.map((key) => key.key))))
  const endpoints = Array.from(
    new Set(data.flatMap((item) => item.endpoints.map((endpoint) => endpoint.name)))
  )

  const keysGraphData = data
    .toReversed()
    .filter((item) => item.keys.some((key) => key.count !== 0))
    .map((item) => {
      return {
        date: item.date,
        ...keys.reduce(
          (acc, key) => {
            const target = item.keys.find((i) => i.key === key)
            acc[key] = {
              count: target?.count ?? 0,
              ip: target?.ip ?? 0,
            }
            return acc
          },
          {} as ApiStatsKeysCardProps['data'][number]
        ),
      }
    }) as ApiStatsKeysCardProps['data']

  const endpointsGraphData = data
    .toReversed()
    .filter((item) =>
      item.endpoints.some((endpoint) => endpoint.count !== 0 || endpoint.averageTime !== 0)
    )
    .map((item) => {
      return {
        date: item.date,
        ...endpoints.reduce(
          (acc, endpoint) => {
            const target = item.endpoints.find((i) => i.name === endpoint)
            acc[endpoint] = {
              count: target?.count ?? 0,
              averageTime: target?.averageTime ?? 0,
              maxTime: target?.maxTime ?? 0,
              minTime: target?.minTime ?? 0,
            }
            return acc
          },
          {} as ApiStatsEndpointsCardProps['data'][number]
        ),
      }
    }) as ApiStatsEndpointsCardProps['data']

  const icons = {
    Factions: SwordsIcon,
    Players: UsersIcon,
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
        <StatCard>
          <StatCardHeader>
            <StatCardTitle>Joueurs uniques</StatCardTitle>
            <icons.Players className="size-4" />
          </StatCardHeader>
          <StatCardContent>
            <StatCardValue>
              {formatNumber(today.playerCount, { notation: 'standard' })}
            </StatCardValue>
            <StatCardChange value={today.playerCount} compare={yesterday.playerCount} />
          </StatCardContent>
        </StatCard>
        <StatCard>
          <StatCardHeader>
            <StatCardTitle>Factions uniques</StatCardTitle>
            <icons.Factions className="size-4" />
          </StatCardHeader>
          <StatCardContent>
            <StatCardValue>
              {formatNumber(today.factionCount, { notation: 'standard' })}
            </StatCardValue>
            <StatCardChange value={today.factionCount} compare={yesterday.factionCount} />
          </StatCardContent>
        </StatCard>
      </div>
      <ApiDatabaseEvolutionCard
        data={data.toReversed().map((item) => {
          return {
            date: item.date,
            playerCount: item.playerCount,
            factionCount: item.factionCount,
          }
        })}
      />
      <ApiStatsKeysCard data={keysGraphData} keys={keys} />
      <ApiStatsEndpointsCard data={endpointsGraphData} endpoints={endpoints} />
    </div>
  )
}

const UsageTab = () => {
  const [data, setData] = useState<ServerUsageInfo[]>([])
  const [lastData, setLastData] = useState<ServerUsageInfo[]>([])
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    const subscription = transmit.subscription('usage/ws')

    const unsbscribe = subscription.onMessage<ServerUsageInfo[]>((message) => {
      setData((prev) => [...prev, ...message])
      setLastData(message)
    })

    const create = async () => {
      setIsSubscribed(false)
      await subscription.create()
      setIsSubscribed(true)
    }

    create()

    return () => {
      unsbscribe()
      subscription.delete()
    }
  }, [])

  const services = useMemo(() => Array.from(new Set(data.flatMap((item) => item.name))), [data])

  const historyRamGraphData = useMemo(
    () =>
      Object.entries(Object.groupBy(data, (item) => item.date)).map(([date, items]) => {
        return {
          date: date,
          ...services.reduce(
            (acc, service) => {
              const target = items?.find((item) => item.name === service)
              acc[service] = target?.memory ?? 0
              return acc
            },
            {} as Record<string, number>
          ),
        }
      }),
    [data, services]
  )

  const historyCpuGraphData = useMemo(
    () =>
      Object.entries(Object.groupBy(data, (item) => item.date)).map(([date, items]) => {
        return {
          date: date,
          ...services.reduce(
            (acc, service) => {
              const target = items?.find((item) => item.name === service)
              acc[service] = target?.cpu ?? 0
              return acc
            },
            {} as Record<string, number>
          ),
        }
      }),
    [data, services]
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(data.length === 0 || !isSubscribed) &&
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="w-full h-40" />)}
        {data.length !== 0 &&
          isSubscribed &&
          lastData.map((item) => (
            <ServerUsageCard key={item.pid}>
              <ServerUsageCardHeader>
                <ServerUsageCardTitle>{item.name}</ServerUsageCardTitle>
                <ServerUsageCardBadge status={item.status} />
              </ServerUsageCardHeader>
              <ServerUsageCardContent className="space-y-1">
                <ServerUsageCardValue before={<CpuIcon className="size-4" />}>
                  CPU: {item.cpu} %
                </ServerUsageCardValue>
                <ServerUsageCardValue before={<MemoryStickIcon className="size-4" />}>
                  RAM:{' '}
                  {formatNumber(item.memory, {
                    notation: 'standard',
                    maximumFractionDigits: 2,
                    unit: 'megabyte',
                    style: 'unit',
                  })}
                </ServerUsageCardValue>
                <ServerUsageCardValue
                  className="font-normal"
                  before={<HashIcon className="size-4" />}
                >
                  PID: {item.pid}
                </ServerUsageCardValue>
                <ServerUsageCardValue
                  className="font-normal"
                  before={<TimerIcon className="size-4" />}
                >
                  UPTIME:{' '}
                  {formatDistance(DateTime.fromMillis(item.uptime), DateTime.fromISO(item.date))}
                </ServerUsageCardValue>
              </ServerUsageCardContent>
            </ServerUsageCard>
          ))}
      </div>
      <UsageHistoryRamCard data={historyRamGraphData} services={services} />
      <UsageHistoryCpuCard data={historyCpuGraphData} services={services} />
    </div>
  )
}
