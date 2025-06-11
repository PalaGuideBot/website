import { Link } from '@inertiajs/react'
import { Alert, Button } from '@lemonsqueezy/wedges'
import { PartyPopperIcon } from 'lucide-react'

import { cn } from '~/lib/utils'

interface GiveawayBannerProps {
  className?: string
}

const GiveawayBanner = ({ className }: GiveawayBannerProps) => {
  return (
    <Alert
      className={cn('bg-linear-to-tr from-primary to-destructive text-white!', className)}
      closable
      before={<PartyPopperIcon className="size-6 text-white" />}
      after={
        <Button variant="tertiary" className="px-4 text-nowrap" size="sm" asChild>
          <Link href="/giveaway">Participer</Link>
        </Button>
      }
    >
      Un giveaway est en cours ! Participez pour tenter de gagner des récompenses.
    </Alert>
  )
}

export { GiveawayBanner }
