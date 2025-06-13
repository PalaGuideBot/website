import * as React from 'react'

import { cn } from '~/lib/utils'

const Page = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('mx-auto w-full max-w-4xl flex flex-col gap-4', className)} {...props} />
  )
}

const PageTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <h1 className={cn('text-xl md:text-2xl font-bold', className)} {...props} />
}

const PageSubTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return <h2 ref={ref} className={cn('font-semibold text-lg', className)} {...props} />
  }
)

export { Page, PageTitle, PageSubTitle }
