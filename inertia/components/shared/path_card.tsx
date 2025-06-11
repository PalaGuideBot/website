import { Link } from '@inertiajs/react'
import React from 'react'

import { Card, CardContent, CardDescription, CardTitle } from '~/components/ui/card'
import { cn } from '~/lib/utils'

const PathCardWrapper = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)} {...props} />
}

const PathCard = ({ className, ...props }: React.ComponentProps<typeof Card>) => {
  return (
    <Card
      className={cn(
        'bg-background relative min-h-28 border-foreground transition-all duration-75 outline-primary outline-2 hover:outline hover:drop-shadow-glow hover:border-primary',
        className
      )}
      {...props}
    />
  )
}

const PathCardTitle = ({
  className,
  children,
  href,
  external = false,
  ...props
}: React.ComponentProps<typeof CardTitle> & { href: string; external?: boolean }) => {
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

const PathCardDescription = CardDescription

const PathCardContent = ({ className, ...props }: React.ComponentProps<typeof CardContent>) => {
  return <CardContent className={cn('p-4', className)} {...props} />
}

export { PathCard, PathCardContent, PathCardDescription, PathCardTitle, PathCardWrapper }
