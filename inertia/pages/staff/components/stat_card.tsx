import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { cn } from '~/lib/utils'

const StatCard = ({ className, ...props }: React.ComponentProps<typeof Card>) => {
  return <Card className={cn('bg-background', className)} {...props} />
}

const StatCardHeader = ({ className, ...props }: React.ComponentProps<typeof CardHeader>) => {
  return (
    <CardHeader
      className={cn('flex flex-row items-center justify-between space-y-0 pb-2', className)}
      {...props}
    />
  )
}

const StatCardTitle = ({ className, ...props }: React.ComponentProps<typeof CardTitle>) => {
  return <CardTitle className={cn('text-sm font-medium', className)} {...props} />
}

const StatCardContent = CardContent

const StatCardValue = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('text-2xl font-bold', className)} {...props} />
}

interface StatCardChangeProps extends React.HTMLAttributes<HTMLParagraphElement> {
  value: number
  compare: number
  zeroText?: string
  text?: string
}

const StatCardChange = ({
  value,
  compare,
  zeroText = "Même quantité qu'hier",
  text = 'par rapport à hier',
  className,
  children,
  ...props
}: StatCardChangeProps) => {
  const change = value - compare
  const isPositive = change > 0
  const isZero = change === 0

  return (
    <p className={cn('text-xs text-muted-foreground', className)} {...props}>
      <span
        className={cn(
          isPositive && 'text-emerald-500',
          !isPositive && !isZero && 'text-destructive'
        )}
      >
        {isPositive && `+${change}`}
        {!isPositive && !isZero && change}
      </span>{' '}
      {isZero ? zeroText : text}
    </p>
  )
}

export { StatCard, StatCardHeader, StatCardTitle, StatCardContent, StatCardValue, StatCardChange }
