import type { Infer } from '@vinejs/vine/types'

import type { playerInfoValidator } from '#stats/validators/player_validator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { cn } from '~/lib/utils'

type Player = Infer<typeof playerInfoValidator>

interface PlayerBadgeIconProps extends React.HTMLAttributes<HTMLImageElement> {
  player: Player
}

const PlayerBadgeIcon = ({ player, className, ...props }: PlayerBadgeIconProps) => {
  const highestFlag = getHighestFlag(player.flags)

  if (!highestFlag) {
    return null
  }

  return (
    <img
      src={getFlagIconUrl(highestFlag.name)}
      className={cn('w-4 h-4 object-contain', className)}
      {...props}
    />
  )
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
  return flags.toSorted((a, b) => a.priority - b.priority).at(-1)
}

function getFlagIconUrl(name: string) {
  return `https://image.palaguidebot.fr/flags/${name.toLowerCase()}`
}

export { PlayerBadge }
