import type { Infer } from '@vinejs/vine/types'
import { LifeBuoyIcon } from 'lucide-react'

import type { calculatorResultValidator } from '#tools/validators/calculator_validator'
import { Card, CardContent } from '~/components/ui/card'
import { cn, formatNumber } from '~/lib/utils'
import { getItemIconUrl } from '~/pages/tools/job_calculator/contents/item'

interface ItemContributionProps {
  item: Extract<
    Infer<typeof calculatorResultValidator>,
    { mode: 'reverse' }
  >['result']['without']['items'][number]
  unlocked?: boolean
}

export function ItemContribution({ item, unlocked = true }: ItemContributionProps) {
  return (
    <Card className="py-2 bg-transparent shadow-none">
      <CardContent className="px-2 relative flex flex-row items-center gap-2">
        <img
          className="w-10 h-10 object-contain"
          style={{ imageRendering: 'pixelated' }}
          src={getItemIconUrl(item.item.id)}
        />
        <div className="grow">
          <h4>{item.item.type}</h4>
          <p className="text-xs text-primary font-bold">
            {formatNumber(item.xp, { notation: 'standard' })} XP
          </p>
        </div>
        <div>
          <p className="uppercase text-muted-foreground text-[10px] text-right">
            {item.item.action} - {formatNumber(item.item.xp, { notation: 'standard' })} xp
          </p>
          <div className="flex items-center gap-1 justify-end text-[10px]">
            <LifeBuoyIcon className="size-2.5" />
            <span
              className={cn(
                'uppercase font-bold text-right',
                unlocked ? 'text-emerald-500' : 'text-red-500'
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
