import * as React from 'react'

import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'

const FormLabel = Label

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />
}

interface FormMessageProps extends Omit<React.ComponentProps<'p'>, 'children'> {
  message?: string | string[]
}

function FormMessage({ className, message, ...props }: FormMessageProps) {
  if (!message) {
    return null
  }

  return (
    <p className={cn('text-destructive text-sm', className)} {...props}>
      {Array.isArray(message) && message.length !== 0 ? message.at(0) : message}
    </p>
  )
}

export { FormItem, FormLabel, FormMessage }
