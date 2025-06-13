import { cn } from '~/lib/utils'

export function GlowText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('hover:drop-shadow-glow transition-all animate-glow', className)}
      {...props}
    />
  )
}
