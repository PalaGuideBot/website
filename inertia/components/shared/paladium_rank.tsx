import { rankToIcon, translateRank } from '~/content/ranks'
import { cn } from '~/lib/utils'
import type { Rank } from '~/types'

interface PaladiumRankProps {
  rank: string
  className?: string
}

export function PaladiumRank({ rank, className }: PaladiumRankProps) {
  const rankIcon = rankToIcon(rank as Rank)
  const translatedRank = translateRank(rank as Rank)

  const iconSize = className?.includes('text-xs') ? 'size-4' : 'w-6 h-6'

  return (
    <div className="flex items-center">
      <span className={cn('font-mc-dungueons text-sm', className)}>{translatedRank}</span>
      {rankIcon && <img src={rankIcon} alt={`${rank}'s icon`} className={cn(iconSize, 'ml-2')} />}
    </div>
  )
}
