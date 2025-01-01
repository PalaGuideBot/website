import { AwardIcon } from 'lucide-react'
import * as React from 'react'

import { Card, CardContent } from '~/components/ui/card'
import { cn } from '~/lib/utils'

interface GiveawayPrizeProps extends React.ComponentProps<typeof Card> {
  prize: string
}

const GiveawayPrize = ({ prize, className, ...props }: GiveawayPrizeProps) => {
  return (
    <Card
      className={cn('bg-transparent border-0 hover:bg-surface transition-colors', className)}
      {...props}
    >
      <CardContent className="p-2 flex items-center gap-2">
        <div className="flex items-center justify-center size-8 rounded-full bg-primary-500/20">
          <AwardIcon className="size-4" />
        </div>
        <span className="font-semibold text-sm">{prize}</span>
      </CardContent>
    </Card>
  )
}

export { GiveawayPrize }
