import { InferPageProps } from '@adonisjs/inertia/types'
import { CodeXmlIcon, PointerIcon, ServerIcon, SwordsIcon, UsersIcon } from 'lucide-react'

import type DashboardController from '#staff/controllers/dashboard_controller'
import { DiscordIcon } from '~/components/icons'
import { StaffLayout } from '~/components/layouts/staff'
import { Page } from '~/components/page'
import { Head } from '~/components/shared/head'
import { Avatar, AvatarImage } from '~/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { ScrollArea } from '~/components/ui/scroll_area'
import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { formatNumber } from '~/lib/utils'
import { ApiDatabaseEvolutionCard } from '../components/api_database_evolution_card'
import { ApiLatestPlayersCard } from '../components/api_latest_players_card'
import {
  ApiStatsEndpointsCard,
  type ApiStatsEndpointsCardProps,
} from '../components/api_stats_endpoints_card'
import { ApiStatsKeysCard, type ApiStatsKeysCardProps } from '../components/api_stats_keys_card'
import { DiscordEvolutionCard } from '../components/discord_evolution_card'
import { DiscordInteractionsCard } from '../components/discord_interactions_card'
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
  const { stats, latestPlayers } = props

  return (
    <>
      <Head title="Tableau de bord" />
      <StaffLayout>
        <Page>
          <Tabs defaultValue="discord">
            <TabsList>
              <TabsTrigger value="discord">
                <DiscordIcon className="size-4" />
                Discord
              </TabsTrigger>
              <TabsTrigger value="api">
                <CodeXmlIcon className="size-4" />
                API
              </TabsTrigger>
            </TabsList>
            <TabsContent value="discord">
              <DiscordTab data={stats} />
            </TabsContent>
            <TabsContent value="api">
              <ApiTab data={{ stats, latestPlayers }} />
            </TabsContent>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
      <Card className="pb-0 bg-background">
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
                        <Avatar>
                          <AvatarImage src={guild.icon} alt={`Icône de ${guild.name}`} />
                        </Avatar>
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

const ApiTab = ({ data }: { data: DashboardIndexPageProps }) => {
  const { stats, latestPlayers } = data
  const [today, yesterday] = stats

  const keys = Array.from(new Set(stats.flatMap((item) => item.keys.map((key) => key.key))))
  const endpoints = Array.from(
    new Set(stats.flatMap((item) => item.endpoints.map((endpoint) => endpoint.name)))
  )

  const keysGraphData = stats
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

  const endpointsGraphData = stats
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        data={stats.toReversed().map((item) => {
          return {
            date: item.date,
            playerCount: item.playerCount,
            factionCount: item.factionCount,
          }
        })}
      />
      <ApiStatsKeysCard data={keysGraphData} keys={keys} />
      <ApiStatsEndpointsCard data={endpointsGraphData} endpoints={endpoints} />
      <ApiLatestPlayersCard data={latestPlayers} />
    </div>
  )
}
