import { Button } from '@lemonsqueezy/wedges'
import { HashIcon } from 'lucide-react'
import { cn } from '~/lib/utils'

const LinkTrigger = ({
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <div className="group flex items-center gap-2">
      {children}
      <Button className="p-1" isIconOnly variant="transparent" asChild>
        <a
          {...props}
          className={cn(
            'inline-block opacity-0 group-hover:opacity-100 transition-opacity',
            className
          )}
        >
          <HashIcon className="size-4" />
        </a>
      </Button>
    </div>
  )
}

export { LinkTrigger }
