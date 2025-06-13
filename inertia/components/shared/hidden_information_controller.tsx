import * as React from 'react'

import { ProfileToggleDisabledIcon } from '~/components/icons'
import { Button } from '~/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { cn } from '~/lib/utils'

interface HiddenInformationControllerButtonProps extends React.ComponentProps<typeof Button> {
  side?: React.ComponentProps<typeof TooltipContent>['side']
  align?: React.ComponentProps<typeof TooltipContent>['align']
}

function HiddenInformationControllerButton({
  className,
  variant = 'ghost',
  size = 'icon',
  side = 'bottom',
  align = 'start',
  ...props
}: HiddenInformationControllerButtonProps) {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <Button variant={variant} size={size} className={cn('p-1', className)} {...props}>
          <ProfileToggleDisabledIcon className="invert dark:invert-0 size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side} align={align}>
        Cet élément a été masqué par le joueur.
      </TooltipContent>
    </Tooltip>
  )
}

interface HiddenInformationControllerProps {
  children?: React.ReactNode
  side?: HiddenInformationControllerButtonProps['side']
  align?: HiddenInformationControllerButtonProps['align']
  active?: boolean
  fallback?: string | number | React.ReactNode
}

export function HiddenInformationController({
  children,
  side,
  align,
  active = true,
  fallback = null,
}: HiddenInformationControllerProps) {
  if (active && children) {
    return (
      <div className="flex flex-row items-center gap-2">
        {children}
        <HiddenInformationControllerButton side={side} align={align} />
      </div>
    )
  }

  if (active && !children) {
    return <HiddenInformationControllerButton side={side} align={align} />
  }

  return fallback
}
