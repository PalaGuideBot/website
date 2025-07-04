import * as React from 'react'

import { cn } from '~/lib/utils'

function Page({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('mx-auto w-full max-w-4xl flex flex-col gap-4', className)} {...props} />
  )
}

function PageTitle({ className, ...props }: React.ComponentProps<'h1'>) {
  return <h1 className={cn('text-xl md:text-2xl font-bold', className)} {...props} />
}

function PageSubTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return <h2 className={cn('font-semibold text-lg', className)} {...props} />
}

export { Page, PageTitle, PageSubTitle }
