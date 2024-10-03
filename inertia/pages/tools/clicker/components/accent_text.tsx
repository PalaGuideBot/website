import { cn } from '~/lib/utils'

const AccentText = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn('text-primary font-bold', className)} {...props} />
}

export { AccentText }
