import { HashIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export function LinkTrigger({ className, children, ...props }: React.ComponentProps<'a'>) {
  return (
    <div className="group flex items-center gap-2">
      {children}
      <Button className="p-1 size-auto" variant="ghost" size="icon" asChild>
        <a
          {...props}
          className={cn(
            'inline-block opacity-0 group-hover:opacity-100 transition-opacity',
            className
          )}
        >
          <HashIcon />
        </a>
      </Button>
    </div>
  )
}
