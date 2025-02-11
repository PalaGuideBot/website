import type { Infer } from '@vinejs/vine/types'

import type { playerInfoValidator } from '#stats/validators/player_validator'
import { CoinIcon } from '~/components/icons'
import { smallIcons as smallJobIcons } from '~/content/jobs'
import { icons as leaderboardIcons } from '~/content/leaderboards'
import { cn, formatNumber, formatPrice } from '~/lib/utils'

type Player = Infer<typeof playerInfoValidator>

type Metric = {
  title: string
  id: string
  isVisible: (player: Player) => boolean
  renderContent: (player: Player) => React.ReactNode
}

export const metrics: Array<Metric> = [
  {
    title: 'Temps de jeu',
    id: 'time-played',
    isVisible: (player) => {
      const lastPlayerData = player.data.at(-1)
      return lastPlayerData !== undefined && lastPlayerData.data.timePlayed >= 0
    },
    renderContent: (player) => {
      const lastPlayerData = player.data.at(-1)!
      return `${Number(lastPlayerData.data.timePlayed / 60).toFixed()} heures`
    },
  },
  {
    title: 'Faction',
    id: 'faction',
    isVisible: (player) => {
      const lastPlayerData = player.data.at(-1)
      return lastPlayerData !== undefined
    },
    renderContent: (player) => {
      const lastPlayerData = player.data.at(-1)!
      // const AllianceIcon = allianceToIcon()
      return lastPlayerData.data.faction || 'Wilderness'
    },
  },
  {
    title: 'Succès',
    id: 'success',
    isVisible: (player) => player.achievements.total > 0,
    renderContent: (player) => `${player.achievements.completed} / ${player.achievements.total}`,
  },
  {
    title: 'Amis',
    id: 'friends',
    isVisible: (player) => player.friends.length > 0,
    renderContent: (player) => player.friends.length,
  },
  {
    title: 'Meilleur classement',
    id: 'best-ranking',
    isVisible: (player) => Object.values(player.leaderboard).some((value) => value > 0),
    renderContent: (player) => {
      const playerLeaderboards = Object.entries(player.leaderboard)
        .map(([key, value]) => ({ key, value }))
        .filter((entry) => entry.value > 0)
        .toSorted((a, b) => a.value - b.value)
        .at(0)!

      const Icon = leaderboardIcons[playerLeaderboards.key as 'money']

      return (
        <p className="flex flex-row gap-2 items-center justify-center">
          <span>{`#${playerLeaderboards.value}`}</span>
          <Icon className="size-6" />
        </p>
      )
    },
  },
  {
    title: 'Clicker',
    id: 'clicker',
    isVisible: (player) => {
      const lastPlayerData = player.data.at(-1)
      return lastPlayerData !== undefined && lastPlayerData.data.clicker !== undefined
    },
    renderContent: (player) => {
      const lastPlayerData = player.data.at(-1)!

      return (
        <p className="flex flex-row items-center justify-center gap-2">
          <span>{formatNumber(Number(lastPlayerData.data.clicker?.production))}</span>
          <CoinIcon className="size-6" />
        </p>
      )
    },
  },
  {
    title: 'Métiers',
    id: 'jobs',
    isVisible: (_) => true,
    renderContent: (player) => {
      const lastPlayerData = player.data.at(-1)!
      const jobs = lastPlayerData.data.jobs

      return (
        <div className="flex flex-row gap-2 items-center justify-center">
          {Object.entries(jobs).map(([jobName, job]) => {
            const Icon = smallJobIcons[jobName as 'miner']
            const jobColor = {
              alchemist: 'bg-job-alchemist',
              farmer: 'bg-job-farmer',
              hunter: 'bg-job-hunter',
              miner: 'bg-job-miner',
            }[jobName as 'miner']

            return (
              <div className="flex flex-col items-center gap-2" key={jobName}>
                <Icon className="size-4" />
                <span
                  className={cn(
                    'text-base font-semibold border-b-4 border-black/50 px-1 text-white',
                    jobColor
                  )}
                >
                  {job.level}
                </span>
              </div>
            )
          })}
        </div>
      )
    },
  },
  {
    title: 'Money max.',
    id: 'money-max',
    isVisible: (_) => true,
    renderContent: (player) => {
      const moneyMax = Math.max(...player.data.map((data) => data.data.money))
      return formatPrice(moneyMax)
    },
  },
]

export function getRandomMetricIds(count: number, filterFn: (metric: Metric) => boolean) {
  const ids = metrics.filter(filterFn).map((metric) => metric.id)

  const result = []
  for (let i = 0; i < count; i++) {
    const metricIndex = Math.floor(Math.random() * ids.length)
    const id = ids[metricIndex]

    result.push(id)

    ids.splice(0, ids.length, ...ids.filter((j) => j !== id))
  }

  return result
}
