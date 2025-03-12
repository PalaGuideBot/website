import { HeartFilledIcon } from '@radix-ui/react-icons'

import { ShibaInfestation } from '~/components/easteregg/shiba_infestation'
import { ZeluckConfetti } from '~/components/easteregg/zeluck_confetti'
import { Card, CardContent } from '~/components/ui/card'
import { cn } from '~/lib/utils'

const CreditCard = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Card>) => {
  return (
    <Card className={cn('p-2 px-4', className)} {...props}>
      <CardContent className="p-0">
        <p className="text-xs">
          Made with <HeartFilledIcon className="text-destructive inline-block size-4" /> by{' '}
          <a className="text-primary" href="/riveur">
            Riveur
          </a>
          , <ShibaInfestation />, <ZeluckConfetti />
        </p>
      </CardContent>
    </Card>
  )
}

export { CreditCard }
