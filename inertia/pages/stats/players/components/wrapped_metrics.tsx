import type { Infer } from '@vinejs/vine/types'

import type { playerWrappedValidator } from '#stats/validators/player_validator'
import { CoinIcon } from '~/components/icons'
import { smallIcons as smallJobIcons } from '~/content/jobs'
import { icons as leaderboardIcons } from '~/content/leaderboards'
import { getPet, translatePet } from '~/content/pets'
import { cn, formatNumber, formatPrice } from '~/lib/utils'

type Player = Infer<typeof playerWrappedValidator>

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
      return player.timePlayed >= 0
    },
    renderContent: (player) => {
      return `${Number(player.timePlayed / 60).toFixed()} heures`
    },
  },
  {
    title: 'Faction',
    id: 'faction',
    isVisible: (_) => true,
    renderContent: (player) => {
      return player.faction.name || 'Wilderness'
    },
  },
  {
    title: 'Succès',
    id: 'achievements',
    isVisible: (player) => player.achievements.total > 0,
    renderContent: (player) => `${player.achievements.completed} / ${player.achievements.total}`,
  },
  {
    title: 'Amis',
    id: 'friends',
    isVisible: (player) => player.friends > 0,
    renderContent: (player) => player.friends,
  },
  {
    title: 'Meilleur classement',
    id: 'best-ranking',
    isVisible: (player) => player.bestLeaderboard !== null,
    renderContent: (player) => {
      const Icon = leaderboardIcons[player.bestLeaderboard!.name as 'money']

      return (
        <p className="flex flex-row gap-2 items-center justify-center">
          <span>{`#${player.bestLeaderboard!.value}`}</span>
          <Icon className="size-6" />
        </p>
      )
    },
  },
  {
    title: 'Clicker : Production',
    id: 'clicker-production',
    isVisible: (_) => true,
    renderContent: (player) => {
      return (
        <p className="flex flex-row items-center justify-center gap-2">
          <span>{formatNumber(player.clicker.production)}</span>
          <CoinIcon className="size-6" />
        </p>
      )
    },
  },
  {
    title: 'Clicker : Bâtiments',
    id: 'clicker-buildings',
    isVisible: (player) => player.clicker.buildings.unlocked > 0,
    renderContent: (player) =>
      `${player.clicker.buildings.unlocked} / ${player.clicker.buildings.total}`,
  },
  {
    title: 'Clicker : Améliorations',
    id: 'clicker-upgrades',
    isVisible: (player) => player.clicker.upgrades.unlocked > 0,
    renderContent: (player) =>
      `${player.clicker.upgrades.unlocked} / ${player.clicker.upgrades.total}`,
  },
  {
    title: 'Métiers',
    id: 'jobs',
    isVisible: (_) => true,
    renderContent: (player) => {
      return (
        <div className="flex flex-row gap-2 items-center justify-center">
          {Object.entries(player.jobs).map(([jobName, level]) => {
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
                  {level}
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
      return formatPrice(player.moneyMax)
    },
  },
  {
    title: 'Skin de familier',
    id: 'pet-skin',
    isVisible: (player) => player.pet !== undefined,
    renderContent: (player) => {
      return translatePet(getPet(player.pet!.currentSkin))
    },
  },
  {
    title: 'Niveau du familier',
    id: 'pet-level',
    isVisible: (player) => player.pet !== undefined,
    renderContent: (player) => {
      return player.pet!.level
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
