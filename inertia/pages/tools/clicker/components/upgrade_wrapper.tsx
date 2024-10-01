import * as React from 'react'

import { PageSubTitle } from '~/components/page'
import { cn } from '~/lib/utils'

const UpgradeWrapper = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />
}

const UpgradeWrapperTitle = (props: React.ComponentProps<typeof PageSubTitle>) => {
  return <PageSubTitle {...props} />
}

const UpgradeWrapperContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('flex flex-wrap gap-2', className)} {...props} />
}

export { UpgradeWrapper, UpgradeWrapperContent, UpgradeWrapperTitle }
