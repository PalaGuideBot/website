import { TrendingUpIcon } from 'lucide-react'

import type { ClickerAnyUpgrade } from '#tools/types'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { getClickerUpgradeImage } from '~/lib/clicker'
import { ucFirst } from '~/lib/string'
import { cn, formatNumber } from '~/lib/utils'
import { usePlayerClickerStore } from '../stores/player_clicker_store'
import { AccentText } from './accent_text'
import { useClickerSettings } from './clicker_settings'

interface UpgradeConditionsProps {
  upgrade: ClickerAnyUpgrade
}

const UpgradeConditions = ({ upgrade }: UpgradeConditionsProps) => {
  const { buildings, upgrades } = useClickerSettings()

  return (
    upgrade.data.conditions.length !== 0 && (
      <div className="space-y-1.5">
        <p>Préconditions:</p>
        <ul className="list-disc list-inside">
          {upgrade.data.conditions.map((condition) => {
            let target = null
            switch (condition.type) {
              case 'building':
                switch (upgrade.type) {
                  case 'building':
                  case 'many':
                  case 'category':
                    target = buildings.find((b) => b.name === upgrade.data.item[0])

                    return (
                      <li key={`${condition.type}-${condition.value}`}>
                        Posséder {condition.value}{' '}
                        <AccentText>{target?.label ?? upgrade.data.item[0]}</AccentText>
                      </li>
                    )
                  case 'posterior':
                    target = buildings.find((b) => b.name === upgrade.data.activeItem[0])

                    return (
                      <li key={`${condition.type}-${condition.value}`}>
                        Posséder {condition.value}{' '}
                        <AccentText>{target?.label ?? upgrade.data.activeItem[0]}</AccentText>
                      </li>
                    )
                  default:
                    return null
                }
              case 'quantity':
                return (
                  <li key={`${condition.type}-${condition.value}`}>
                    Avoir collecté{' '}
                    <AccentText>
                      {Number(condition.value) !== -1
                        ? formatNumber(Number(condition.value), { notation: 'standard' })
                        : '???'}
                    </AccentText>{' '}
                    coins
                  </li>
                )
              case 'time':
                return (
                  <li key={`${condition.type}-${condition.value}`}>
                    La saison à commencée depuis <AccentText>{condition.value}</AccentText> jours
                  </li>
                )
              case 'upgrade':
                switch (upgrade.type) {
                  case 'click':
                    target = upgrades.clicks.find((u) => u.name === condition.value)

                    return (
                      <li key={`${condition.type}-${condition.value}`}>
                        Posséder le clic <AccentText>{target?.label ?? condition.value}</AccentText>
                      </li>
                    )
                  default:
                    return `Posséder l'upgrade ${condition.value}`
                }
              default:
                return null
            }
          })}
        </ul>
      </div>
    )
  )
}

interface UpgradeAdvantageProps {
  upgrade: ClickerAnyUpgrade
}

const UpgradeAdvantage = ({ upgrade }: UpgradeAdvantageProps) => {
  const { buildings, upgrades } = useClickerSettings()

  return (
    <div className="flex flex-row gap-2 items-center">
      <TrendingUpIcon className="size-4" />
      {upgrade.type === 'click' && (
        <p>
          <AccentText>Double</AccentText> votre production par clic (
          <AccentText>{formatNumber(upgrade.data.rate, { notation: 'standard' })}</AccentText>/clic)
        </p>
      )}
      {upgrade.type === 'global' && (
        <p>
          Augmente de <AccentText>10%</AccentText> la production globale
        </p>
      )}
      {upgrade.type === 'terrain' && (
        <p>
          Augmente de <AccentText>1%</AccentText> la production de la catégorie{' '}
          <AccentText>{ucFirst(upgrade.data.job)}</AccentText> par niveau du métier de{' '}
          <AccentText>{ucFirst(upgrade.data.job)}</AccentText>
        </p>
      )}
      {upgrade.type === 'building' && (
        <p>
          Augmente de <AccentText>100%</AccentText> la production du bâtiment{' '}
          <AccentText>
            {buildings.find((building) => building.name === upgrade.data.item[0])?.label ??
              upgrade.data.item[0]}
          </AccentText>
        </p>
      )}
      {upgrade.type === 'many' && (
        <p>
          Augmente de <AccentText>1%</AccentText> la production pour chaque copie du bâtiment{' '}
          <AccentText>
            {buildings.find((building) => building.name === upgrade.data.item[0])?.label ??
              upgrade.data.item[0]}
          </AccentText>
        </p>
      )}
      {upgrade.type === 'posterior' && (
        <p>
          Augmente de <AccentText>1%</AccentText> la production pour chaque copie du bâtiment
          postérieur à{' '}
          <AccentText>
            {buildings.find((building) => building.name === upgrade.data.activeItem[0])?.label ??
              upgrade.data.activeItem[0]}
          </AccentText>
        </p>
      )}
      {upgrade.type === 'category' && (
        <p>
          Augmente de{' '}
          <AccentText>
            {formatNumber(
              (upgrades.categories.find((u) => u.name === upgrade.data.name)?.pourcentage || 0) *
                100,
              { notation: 'standard', maximumFractionDigits: 0 }
            )}
            %
          </AccentText>{' '}
          la production de la catégorie{' '}
          <AccentText>{ucFirst(upgrade.data.category || 'inconnu')}</AccentText>
        </p>
      )}
    </div>
  )
}

interface UpgradeCardProps {
  upgrade: ClickerAnyUpgrade
  unlocked?: boolean
  onClick?: () => void
}

const UpgradeCard = ({ upgrade, unlocked = false, onClick }: UpgradeCardProps) => {
  const { calculator } = useClickerSettings()
  const playerClickerStore = usePlayerClickerStore()

  const unlockable = playerClickerStore.isUpgradeUnlockable(upgrade, calculator)

  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={cn(
            'p-2 rounded-md border bg-card shadow transition-colors duration-100 hover:bg-black/15',
            !unlocked &&
              unlockable &&
              'bg-primary border-primary shadow-[inset_0px_-7px_0px_-2px_rgba(0,0,0,0.3)]',
            !unlockable &&
              playerClickerStore.options.markOutLockedUpgrades &&
              'opacity-50 hover:bg-muted',
            unlocked &&
              'opacity-100 bg-clicker-unlocked border-clicker-unlocked shadow-[inset_0px_-7px_0px_-2px_rgba(0,0,0,0.3)]'
          )}
        >
          <img className="w-10 h-auto object-cover" src={getClickerUpgradeImage(upgrade)} />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="center" className="p-0">
        <div className="border-b p-2">
          <p className="font-bold">{upgrade.data.label}</p>
        </div>
        <div className="p-4 space-y-1.5">
          <p>
            Prix:{' '}
            <AccentText>{formatNumber(upgrade.data.price, { notation: 'standard' })}</AccentText>{' '}
            coins
          </p>
          {playerClickerStore.options.showUpgradeAdvantages && (
            <UpgradeAdvantage upgrade={upgrade} />
          )}
          <UpgradeConditions upgrade={upgrade} />
        </div>
      </TooltipContent>
    </Tooltip>
  )
}

export { UpgradeCard }
