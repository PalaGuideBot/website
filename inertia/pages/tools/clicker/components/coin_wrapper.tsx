import { CoinIcon } from '~/components/icons'
import { cn } from '~/lib/utils'

const CoinWrapper = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('flex flex-row gap-1.5 items-center', className)} {...props}>
      <p className="font-pixel text-xs text-primary">{children}</p>
      <CoinIcon />
    </div>
  )
}

export { CoinWrapper }
