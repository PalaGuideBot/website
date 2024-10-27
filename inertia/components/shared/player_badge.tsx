import type { Infer } from '@vinejs/vine/types'
import { CodeXmlIcon, HandshakeIcon, LinkIcon, LucideProps } from 'lucide-react'

import type { playerInfoValidator } from '#stats/validators/player_validator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { cn } from '~/lib/utils'

type Player = Infer<typeof playerInfoValidator>

interface PlayerBadgeIconProps extends LucideProps {
  player: Player
}

const PlayerBadgeIcon = ({ player, className, ...props }: PlayerBadgeIconProps) => {
  const highestFlag = getHighestFlag(player.flags)

  switch (highestFlag?.name) {
    case 'STAFF':
      return <CodeXmlIcon className={cn('size-6 text-primary', className)} {...props} />
    case 'CONTRIBUTOR':
      return <HandshakeIcon className={cn('size-5 text-job-alchemist', className)} {...props} />
    case 'LINK':
      return <LinkIcon className={cn('size-5 text-job-hunter', className)} {...props} />
    default:
      return null
  }
}

interface PlayerBadgeProps extends React.ComponentProps<typeof TooltipTrigger> {
  player: Player
}

const PlayerBadge = ({ player, ...props }: PlayerBadgeProps) => {
  const highestFlag = getHighestFlag(player.flags)

  if (!highestFlag) {
    return null
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger {...props}>
          <PlayerBadgeIcon player={player} />
        </TooltipTrigger>
        <TooltipContent className="text-left space-y-1.5" side="bottom" align="start">
          <p className="font-semibold">{highestFlag.label}</p>
          <p className="text-sm">{highestFlag.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function getHighestFlag(flags: Player['flags']) {
  return flags.toSorted((f) => f.priority).at(-1)
}

export { PlayerBadge }
