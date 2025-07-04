import { PageSubTitle } from '~/components/page'
import { cn } from '~/lib/utils'

function UpgradeWrapper({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />
}

function UpgradeWrapperTitle(props: React.ComponentProps<typeof PageSubTitle>) {
  return <PageSubTitle {...props} />
}

function UpgradeWrapperContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-wrap gap-2', className)} {...props} />
}

export { UpgradeWrapper, UpgradeWrapperContent, UpgradeWrapperTitle }
