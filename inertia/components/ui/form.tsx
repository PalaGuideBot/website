import { Label } from '@lemonsqueezy/wedges'
import * as React from 'react'

import { cn } from '~/lib/utils'

const FormLabel = Label

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props} />
})

export { FormItem, FormLabel }
