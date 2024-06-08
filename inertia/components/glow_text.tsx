import { cn } from '~/lib/utils'

const GlowText = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('hover:drop-shadow-glow transition-all animate-glow', className)}
      {...props}
    />
  )
}

export { GlowText }
