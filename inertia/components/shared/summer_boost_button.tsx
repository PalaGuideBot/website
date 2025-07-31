import { cn } from '~/lib/utils'
import { SummerRushIcon } from '../icons'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export function SummerBoostButton({
  className,
  tooltip,
  ...props
}: React.ComponentProps<typeof Button> & {
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
}) {
  const button = (
    <Button
      className={cn(
        'font-pixel hover:bg-[#26b9ef]/80 bg-[#26b9ef] border-4 border-t-white/50 border-b-black/50 text-white rounded-none cursor-default',
        className
      )}
      {...props}
    >
      Summer Boost
      <SummerRushIcon className="size-4" />
    </Button>
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === 'string') {
    tooltip = { children: tooltip }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent sideOffset={4} side="bottom" align="start" {...tooltip}>
        {tooltip.children}
      </TooltipContent>
    </Tooltip>
  )
}
