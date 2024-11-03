import { Label } from '@lemonsqueezy/wedges'
import * as React from 'react'

import { cn } from '~/lib/utils'

const FormLabel = Label

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props} />
})

interface FormMessageProps extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'children'> {
  message?: string | string[]
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, message, ...props }, ref) => {
    if (!message) {
      return null
    }

    return (
      <p ref={ref} className={cn('text-destructive text-sm', className)} {...props}>
        {Array.isArray(message) && message.length !== 0 ? message.at(0) : message}
      </p>
    )
  }
)

export { FormLabel, FormItem, FormMessage }
