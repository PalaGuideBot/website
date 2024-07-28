import { Badge, Loading } from '@lemonsqueezy/wedges'
import { BanIcon, CircleHelpIcon, CirclePowerIcon, PowerIcon } from 'lucide-react'
import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { cn } from '~/lib/utils'
import { ServerUsageInfo } from '~/types'

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
  return <CardTitle className={cn('font-bold uppercase', className)} {...props} />
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
    <div
      className={cn('font-bold text-sm', before && 'flex items-center gap-2', className)}
      {...props}
    >
      {before}
      {children}
    </div>
  )
}

type ServerUsageBadgeProps = React.ComponentProps<typeof Badge> & {
  status: ServerUsageInfo['status']
}

const ServerUsageBadge = ({
  className,
  children,
  status,
  stroke = true,
  shape = 'pill',
  ...props
}: ServerUsageBadgeProps) => {
  const Icon = statusToIcon(status)
  return (
    <Badge
      shape={shape}
      stroke={stroke}
      before={Icon}
      className={cn('text-xs', className)}
      {...props}
    >
      {translateStatus(status)}
    </Badge>
  )
}

function statusToIcon(status: ServerUsageInfo['status']) {
  const iconMap = {
    'online': <CirclePowerIcon className="text-wg-green" />,
    'stopping': <Loading type="dots" className="text-destructive" />,
    'stopped': <PowerIcon className="text-destructive" />,
    'launching': <Loading type="dots" />,
    'errored': <BanIcon className="text-destructive" />,
    'one-launch-status': <CircleHelpIcon className="text-wg-yellow" />,
  } satisfies Record<typeof status, any>

  return iconMap[status]
}

function translateStatus(status: ServerUsageInfo['status']) {
  const statusMap: Record<typeof status, string> = {
    'online': 'En ligne',
    'stopping': 'Arrêt en cours',
    'stopped': 'Arrêté',
    'launching': 'Démarrage',
    'errored': 'Erreur',
    'one-launch-status': 'Inconnu',
  }

  return statusMap[status] ?? 'Inconnu'
}

export {
  ServerUsageCard,
  ServerUsageBadge as ServerUsageCardBadge,
  ServerUsageCardContent,
  ServerUsageCardHeader,
  ServerUsageCardTitle,
  ServerUsageCardValue,
}
