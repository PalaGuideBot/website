import { cn } from '~/lib/utils'

export function AccentText({ className, ...props }: React.ComponentProps<'span'>) {
  return <span className={cn('text-primary font-bold', className)} {...props} />
}
