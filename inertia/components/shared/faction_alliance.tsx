import { type Infer } from '@vinejs/vine/types'

import type { factionInfoValidator } from '#stats/validators/faction_validator'
import { allianceToIcon } from '~/content/factions'
import { cn } from '~/lib/utils'

interface FactionAllianceProps {
  alliance: Infer<typeof factionInfoValidator>['alliance']
  className?: string
}

export function FactionAlliance({ alliance, className }: FactionAllianceProps) {
  const AllianceIcon = allianceToIcon(alliance)

  const iconSize = className?.includes('text-xs') ? 'size-4' : 'w-6 h-6'

  return (
    <div className="flex items-center">
      <span className={cn('font-mc-dungueons text-sm', className)}>{alliance}</span>
      {AllianceIcon && <AllianceIcon className={cn(iconSize, 'ml-2')} />}
    </div>
  )
}
