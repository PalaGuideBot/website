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
    <p className={cn('text-xs text-surface-400', className)} {...props}>
      <span
        className={cn(isPositive && 'text-wg-green', !isPositive && !isZero && 'text-destructive')}
      >
        {isPositive && `+${change}`}
        {!isPositive && !isZero && change}
      </span>{' '}
      {isZero ? zeroText : text}
    </p>
  )
}

const StatAverage = ({ value }: { value: number[] }) => {
  if (value.length === 0 || value.every((v) => v === 0)) {
    return (
      <p className="text-xs text-surface-400">Aucune donnée disponible pour calculer la moyenne</p>
    )
  } else {
    return (
      <p className="text-xs text-surface-400">
        <span className="text-surface-600 text-wg-green">≈ 0</span> gagner par jour
      </p>
    )
  }
}

export {
  StatCard,
  StatCardHeader,
  StatCardTitle,
  StatCardContent,
  StatCardValue,
  StatCardChange,
  StatAverage,
}
