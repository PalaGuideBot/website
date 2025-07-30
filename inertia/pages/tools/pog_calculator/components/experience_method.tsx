import type { Infer } from '@vinejs/vine/types'

import type { calculatorResultValidator } from '#tools/validators/pog_validator'
import { Card, CardContent } from '~/components/ui/card'
import { getMinecraftItemUrl } from '~/lib/minecraft'
import { cn, formatNumber } from '~/lib/utils'
import { SummerRushIcon } from '~/components/icons'

type Item = Infer<typeof calculatorResultValidator>['items'][number]

interface ExperienceMethodProps {
  item: Item
  os: keyof Item['os']
  target?: boolean
}

export function ExperienceMethod({ item, os, target = false }: ExperienceMethodProps) {
  const unlocked = item.os[os].current

  return (
    <Card
      className="py-2 bg-transparent shadow-none data-[target=true]:border-0 data-[target=true]:outline-2 data-[target=true]:outline-primary"
      data-target={target}
    >
      <CardContent className="px-2 relative flex flex-row items-center gap-2">
        <img
          className="w-10 h-10 object-contain"
          style={{ imageRendering: 'pixelated' }}
          src={getMinecraftItemUrl(item.id)}
        />
        <div className="grow">
          <h4>{item.name}</h4>
          {unlocked && (
            <p className="text-xs text-primary font-bold">
              {formatNumber(item.os[os].amount, { notation: 'standard' })}
            </p>
          )}
        </div>
        <div>
          <div className="flex gap-2 items-center justify-end">
            <p className="uppercase text-muted-foreground text-[10px] text-right">
              Break -{' '}
              <span className="text-[#26b9ef]">
                {formatNumber(item.xp, { notation: 'standard' })} xp
              </span>
            </p>
            <SummerRushIcon />
          </div>
          <div className="flex items-center gap-1 justify-end text-[10px]">
            <span className="uppercase font-semibold">OS - </span>
            <span
              className={cn(
                'uppercase font-bold text-right',
                unlocked ? 'text-emerald-500' : 'text-red-500'
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
