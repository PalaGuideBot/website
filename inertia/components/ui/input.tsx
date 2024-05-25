import * as React from 'react'
import { cn } from '~/lib/utils'

export type InputElement = HTMLInputElement

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  destructive?: boolean
}

/* -------------------------------- Component ------------------------------- */
const Input = React.forwardRef<InputElement, InputProps>(
  ({ className, destructive, ...props }, ref) => {
    const ariaInvalid = props['aria-invalid'] ?? destructive

    return (
      <input
        ref={ref}
        aria-invalid={ariaInvalid}
        className={cn(
          'rounded-lg border bg-background px-4 py-2 text-sm leading-6 shadow-wg-xs transition-colors duration-100 placeholder:text-surface-500',
          'outline-primary focus:outline focus:outline-2 focus:-outline-offset-1',
          !props.disabled &&
            'text-surface-900 hover:border-surface-300 dark:hover:border-surface-200',
          props.disabled &&
            'cursor-not-allowed bg-surface-50 text-surface-300 placeholder:text-surface-300 dark:bg-white/5 dark:text-surface-200 dark:placeholder:text-surface-200',
          ariaInvalid &&
            'border-destructive outline-destructive hover:border-destructive dark:hover:border-destructive',
          !ariaInvalid && 'border-surface-200 dark:border-surface-100',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
