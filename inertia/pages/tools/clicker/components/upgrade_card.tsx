import type { ClickerAnyUpgrade } from '#tools/types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { getClickerUpgradeImage } from '~/lib/clicker'
import { cn, formatNumber } from '~/lib/utils'
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
                        <span className="font-bold text-primary">
                          {target?.label ?? upgrade.data.item[0]}
                        </span>
                      </li>
                    )
                  case 'posterior':
                    target = buildings.find((b) => b.name === upgrade.data.activeItem[0])

                    return (
                      <li key={`${condition.type}-${condition.value}`}>
                        Posséder {condition.value}{' '}
                        <span className="font-bold text-primary">
                          {target?.label ?? upgrade.data.activeItem[0]}
                        </span>
                      </li>
                    )
                  default:
                    return null
                }
              case 'quantity':
                return (
                  <li key={`${condition.type}-${condition.value}`}>
                    Avoir collecté{' '}
                    <span className="font-bold text-primary">
                      {formatNumber(Number(condition.value), { notation: 'standard' })}
                    </span>{' '}
                    coins
                  </li>
                )
              case 'time':
                return (
                  <li key={`${condition.type}-${condition.value}`}>
                    La saison à commencé depuis{' '}
                    <span className="font-bold text-primary">{condition.value}</span> jours
                  </li>
                )
              case 'upgrade':
                switch (upgrade.type) {
                  case 'click':
                    target = upgrades.clicks.find((u) => u.name === condition.value)

                    return (
                      <li key={`${condition.type}-${condition.value}`}>
                        Posséder le clic{' '}
                        <span className="font-bold text-primary">
                          {target?.label ?? condition.value}
                        </span>
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

interface UpgradeCardProps {
  upgrade: ClickerAnyUpgrade
  unlocked?: boolean
  onClick?: () => void
}

const UpgradeCard = ({ upgrade, unlocked = false, onClick }: UpgradeCardProps) => {
  const { buildings } = useClickerSettings()

  const getLabel = (anyUpgrade: ClickerAnyUpgrade) => {
    let target = null
    switch (anyUpgrade.type) {
      case 'posterior':
        target = buildings.find((b) => b.name === anyUpgrade.data.activeItem[0])
        return `Production postérieure - ${target?.label ?? anyUpgrade.data.activeItem[0]}`
      case 'many':
        target = buildings.find((b) => b.name === anyUpgrade.data.item[0])
        return `Production nombreuse - ${target?.label ?? anyUpgrade.data.item[0]}`
      default:
        return anyUpgrade.data?.label ?? anyUpgrade.data.name
    }
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={cn(
              'p-2 rounded-md border bg-surface shadow transition-colors duration-100 hover:bg-black/15',
              unlocked &&
                'bg-clicker-unlocked border-clicker-unlocked shadow-[inset_0px_-7px_0px_-2px_rgba(0,0,0,0.3)]'
            )}
          >
            <img className="w-10 h-auto object-cover" src={getClickerUpgradeImage(upgrade)} />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="center" className="p-0">
          <div className="border-b p-2">
            <p className="font-bold">{getLabel(upgrade)}</p>
          </div>
          <div className="p-4 space-y-1.5">
            <p>
              Prix:{' '}
              <span className="font-bold text-primary">
                {formatNumber(upgrade.data.price, { notation: 'standard' })}
              </span>{' '}
              coins
            </p>
            <UpgradeConditions upgrade={upgrade} />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { UpgradeCard }
