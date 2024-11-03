import type { Infer } from '@vinejs/vine/types'
import { LifeBuoyIcon } from 'lucide-react'

import type { calculatorResultValidator } from '#tools/validators/calculator_validator'
import { Card, CardContent } from '~/components/ui/card'
import { cn, formatNumber } from '~/lib/utils'

interface ExperienceMethodProps {
  item: Infer<typeof calculatorResultValidator>['items']['without'][number]
  unlocked?: boolean
}

const ExperienceMethod = ({ item, unlocked = true }: ExperienceMethodProps) => {
  return (
    <Card className="bg-transparent">
      <CardContent className="p-2 relative flex flex-row items-center gap-2">
        <img className="w-10 h-10 object-contain" src={getItemIconUrl(item.item.id)} />
        <div className="flex-grow">
          <h4>{item.item.type}</h4>
          <p className="text-xs text-primary font-bold">
            {formatNumber(item.amount, { notation: 'standard' })}
          </p>
        </div>
        <div>
          <p className="uppercase text-surface-400 text-xxs text-right">
            {item.item.action} - {formatNumber(item.item.xp, { notation: 'standard' })} xp
          </p>
          <div className="flex items-center gap-1 justify-end text-xxs">
            <LifeBuoyIcon className="size-2.5" />
            <span
              className={cn(
                'uppercase font-bold text-right',
                unlocked ? 'text-wg-green' : 'text-destructive'
              )}
            >
              Niveau {item.item.from}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getItemIconUrl(id: string) {
  return `https://image.palaguidebot.fr/calculator/icons/${id}`
}

/* function translateAction(action: string) {
  const translations: Record<string, string> = {
    'consumes': 'Consommer',
    'kill': 'Tuer',
    'smelt': 'Cuir',
    'fish': 'Pêcher',
    'craft': 'Crafter',
    'break': 'Casser',
    'extract from sap': 'Extraire de la sève',
    'throw in a cauldron': 'Jeter dans un Chaudron',
    'craft in a cauldron': 'Crafter dans un Chaudron',
    'craft in portal': 'Crafter dans un Portail',
  }

  return translations[action.toLowerCase()] || action
} */

export { ExperienceMethod }
