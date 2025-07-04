import { Link } from '@inertiajs/react'

import { Card, CardContent, CardDescription, CardTitle } from '~/components/ui/card'
import { cn } from '~/lib/utils'

function PathCardWrapper({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)} {...props} />
}

function PathCard({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        'bg-background relative min-h-28 border-foreground transition-all duration-75 outline-primary hover:outline-2 hover:drop-shadow-glow hover:border-primary',
        className
      )}
      {...props}
    />
  )
}

function PathCardTitle({
  className,
  children,
  href,
  external = false,
  ...props
}: React.ComponentProps<typeof CardTitle> & { href: string; external?: boolean }) {
  const linkClass = 'before:absolute before:inset-0 before:content-[""] before:z-1'
  return (
    <CardTitle className={cn('text-xl font-bold', className)} {...props}>
      {external ? (
        <a className={linkClass} href={href} target="_blank" children={children} />
      ) : (
        <Link className={linkClass} href={href} children={children} />
      )}
    </CardTitle>
  )
}
export {
  PathCard,
  CardContent as PathCardContent,
  CardDescription as PathCardDescription,
  PathCardTitle,
  PathCardWrapper,
}
