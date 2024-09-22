import { Button } from '@lemonsqueezy/wedges'
import React from 'react'

import { ProfileToggleDisabledIcon } from '~/components/icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { cn } from '~/lib/utils'

interface HiddenInformationControllerButtonProps extends React.ComponentProps<typeof Button> {
  side?: React.ComponentProps<typeof TooltipContent>['side']
  align?: React.ComponentProps<typeof TooltipContent>['align']
}

const HiddenInformationControllerButton = ({
  className,
  variant = 'transparent',
  size = 'xs-icon',
  isIconOnly = true,
  side = 'bottom',
  align = 'start',
  ...props
}: HiddenInformationControllerButtonProps) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size={size}
            isIconOnly={isIconOnly}
            className={cn('p-1', className)}
            {...props}
          >
            <ProfileToggleDisabledIcon className="invert dark:invert-0 size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          Cet élément a été masqué par le joueur.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface HiddenInformationControllerProps {
  children?: React.ReactNode
  side?: HiddenInformationControllerButtonProps['side']
  align?: HiddenInformationControllerButtonProps['align']
  active?: boolean
  fallback?: string | number | React.ReactNode
}

const HiddenInformationController = ({
  children,
  side,
  align,
  active = true,
  fallback = null,
}: HiddenInformationControllerProps) => {
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

export { HiddenInformationController }
