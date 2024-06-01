import { cn } from '~/lib/utils'

const Page = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('mx-auto w-full max-w-4xl flex flex-col gap-4', className)} {...props} />
  )
}

const PageTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <h1 className={cn('text-lg font-medium', className)} {...props} />
}

const PageSubTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <h2 className={cn('font-pixel', className)} {...props} />
}

export { Page, PageTitle, PageSubTitle }
