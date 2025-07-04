import { AwardIcon } from 'lucide-react'
import * as React from 'react'

import { Card, CardContent } from '~/components/ui/card'
import { cn } from '~/lib/utils'

interface GiveawayPrizeProps extends React.ComponentProps<typeof Card> {
  prize: string
}

export function GiveawayPrize({ prize, className, ...props }: GiveawayPrizeProps) {
  return (
    <Card
      className={cn('p-0 bg-transparent border-0 hover:bg-card transition-colors', className)}
      {...props}
    >
      <CardContent className="p-2 flex items-center gap-2">
        <div className="flex items-center justify-center size-8 rounded-full bg-primary/20">
          <AwardIcon className="size-4" />
        </div>
        <span className="font-semibold text-sm">{prize}</span>
      </CardContent>
    </Card>
  )
}
