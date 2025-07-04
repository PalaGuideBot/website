import * as React from 'react'

import { cn } from '~/lib/utils'
import { LinkTrigger } from '../shared/link_trigger'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col rounded-md border py-4 shadow-sm',
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header flex items-start gap-1.5 px-4 [.border-b]:pb-4',
        className
      )}
      {...props}
    />
  )
}

function CardTitle({
  href,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & { href?: string }) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold tracking-tighter', className)}
      {...props}
    >
      {href ? <LinkTrigger href={href}>{children}</LinkTrigger> : children}
    </div>
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-4', className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-4 [.border-t]:pt-4', className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
