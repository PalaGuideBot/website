import type { Infer } from '@vinejs/vine/types'

import type { calculatorResultValidator } from '#tools/validators/pog_validator'
import { Card, CardContent } from '~/components/ui/card'
import { cn, formatNumber } from '~/lib/utils'

type Item = Infer<typeof calculatorResultValidator>['items'][number]

interface ExperienceMethodProps {
  item: Item
  os: keyof Item['os']
}

const ExperienceMethod = ({ item, os }: ExperienceMethodProps) => {
  const unlocked = item.os[os].current

  return (
    <Card className="bg-transparent">
      <CardContent className="p-2 relative flex flex-row items-center gap-2">
        <img
          className="w-10 h-10 object-contain"
          style={{ imageRendering: 'pixelated' }}
          src={getItemIconUrl(item.id)}
        />
        <div className="flex-grow">
          <h4>{item.name}</h4>
          <p className="text-xs text-primary font-bold">
            {formatNumber(item.os[os].amount, { notation: 'standard' })}
          </p>
        </div>
        <div>
          <p className="uppercase text-surface-400 text-xxs text-right">
            Break - {formatNumber(item.xp, { notation: 'standard' })} xp
          </p>
          <div className="flex items-center gap-1 justify-end text-xxs">
            <span className="uppercase font-semibold">OS - </span>
            <span
              className={cn(
                'uppercase font-bold text-right',
                unlocked ? 'text-wg-green' : 'text-destructive'
              )}
            >
              {unlocked ? `Niveau ${item.os[os].from}` : `A partir du niveau ${item.os[os].from}`}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getItemIconUrl(id: string) {
  return `https://image.palaguidebot.fr/minecraft/items/${id}`
}

export { ExperienceMethod }
