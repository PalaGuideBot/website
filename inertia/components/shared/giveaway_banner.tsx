import { Link } from '@inertiajs/react'

import { Alert, AlertDescription } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

interface GiveawayBannerProps {
  className?: string
}

export function GiveawayBanner({ className }: GiveawayBannerProps) {
  return (
    <Alert className={cn('bg-linear-to-tr from-primary to-destructive', className)}>
      <AlertDescription className="text-white flex items-center justify-between gap-4">
        <span>Un giveaway est en cours ! Participez pour tenter de gagner des récompenses.</span>
        <Button className="px-4 text-nowrap" size="sm" asChild>
          <Link href="/giveaway">Participer</Link>
        </Button>
      </AlertDescription>
    </Alert>
  )
}
