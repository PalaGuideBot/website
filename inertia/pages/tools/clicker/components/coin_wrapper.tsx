import { CoinIcon } from '~/components/icons'
import { cn } from '~/lib/utils'

export function CoinWrapper({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-row gap-1.5 items-center', className)} {...props}>
      <p className="font-pixel text-xs text-primary">{children}</p>
      <CoinIcon />
    </div>
  )
}
