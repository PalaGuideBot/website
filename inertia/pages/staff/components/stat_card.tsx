import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { cn } from '~/lib/utils'

function StatCard({ className, ...props }: React.ComponentProps<typeof Card>) {
  return <Card className={cn('bg-background', className)} {...props} />
}

function StatCardHeader({ className, ...props }: React.ComponentProps<typeof CardHeader>) {
  return (
    <CardHeader
      className={cn('flex flex-row items-center justify-between space-y-0 pb-2', className)}
      {...props}
    />
  )
}

function StatCardTitle({ className, ...props }: React.ComponentProps<typeof CardTitle>) {
  return <CardTitle className={cn('text-sm font-medium', className)} {...props} />
}

function StatCardValue({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('text-2xl font-bold', className)} {...props} />
}

interface StatCardChangeProps extends React.ComponentProps<'p'> {
  value: number
  compare: number
  zeroText?: string
  text?: string
}

function StatCardChange({
  value,
  compare,
  zeroText = "Même quantité qu'hier",
  text = 'par rapport à hier',
  className,
  children,
  ...props
}: StatCardChangeProps) {
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

export {
  StatCard,
  StatCardChange,
  CardContent as StatCardContent,
  StatCardHeader,
  StatCardTitle,
  StatCardValue,
}
