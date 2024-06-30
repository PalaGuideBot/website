import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { cn } from '~/lib/utils'

const ServerUsageCard = ({ className, ...props }: React.ComponentProps<typeof Card>) => {
  return <Card className={cn('bg-background', className)} {...props} />
}

const ServerUsageCardHeader = ({
  className,
  ...props
}: React.ComponentProps<typeof CardHeader>) => {
  return (
    <CardHeader
      className={cn('flex flex-row items-center justify-between space-y-0 pb-2', className)}
      {...props}
    />
  )
}

const ServerUsageCardTitle = ({ className, ...props }: React.ComponentProps<typeof CardTitle>) => {
  return <CardTitle className={cn('text-sm font-medium uppercase', className)} {...props} />
}

const ServerUsageCardContent = CardContent

interface ServerUsageCardValueProps extends React.HTMLAttributes<HTMLDivElement> {
  before?: React.ReactNode
}

const ServerUsageCardValue = ({
  className,
  children,
  before,
  ...props
}: ServerUsageCardValueProps) => {
  return (
    <div className={cn('font-bold', before && 'flex items-center gap-2', className)} {...props}>
      {before}
      {children}
    </div>
  )
}

export {
  ServerUsageCard,
  ServerUsageCardContent,
  ServerUsageCardHeader,
  ServerUsageCardTitle,
  ServerUsageCardValue,
}
