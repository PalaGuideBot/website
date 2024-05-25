import { icons } from '~/content/ranks'
import { cn } from '~/lib/utils'
import type { Rank } from '~/types'

type PaladiumRankProps = {
  rank: string
  className?: string
}

const PaladiumRank = ({ rank, className }: PaladiumRankProps) => {
  const rankIcon = icons[rank as Rank]

  const iconSize = className?.includes('text-xs') ? 'size-4' : 'w-6 h-6'

  return (
    <div className="flex items-center">
      <span className={cn('font-mc-dungueons text-sm', className)}>{rank}</span>
      {rankIcon && <img src={rankIcon} className={cn(iconSize, 'ml-2')} />}
    </div>
  )
}

export default PaladiumRank
