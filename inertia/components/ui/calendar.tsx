import { Button } from '@lemonsqueezy/wedges'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'
import { DayPicker, type DayPickerProps } from 'react-day-picker'
import { fr } from 'react-day-picker/locale'

import { cn } from '~/lib/utils'

export type CalendarProps = DayPickerProps

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  locale = fr,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={locale}
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'relative flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        nav: 'flex items-center justify-between absolute w-full z-10 px-1',
        month_caption: 'flex justify-center items-center h-7',
        caption_label: 'text-sm font-medium',
        month_grid: 'border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-surface-400 w-8 font-normal text-xs',
        week: 'flex mt-2',
        day: 'p-0',
        range_middle: '*:rounded-none *:first:rounded-s-md *:last:rounded-e-md',
        range_start: '*:rounded-s-lg',
        range_end: '*:rounded-e-lg',
        ...classNames,
      }}
      components={{
        NextMonthButton({ className: cName, ...buttonProps }) {
          return (
            <Button
              variant="outline"
              className={cn('h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100', cName)}
              {...buttonProps}
            />
          )
        },
        PreviousMonthButton({ className: cName, ...buttonProps }) {
          return (
            <Button
              variant="outline"
              className={cn('h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100', cName)}
              {...buttonProps}
            />
          )
        },
        DayButton({ day, modifiers, className: cName, ...buttonProps }) {
          return (
            <Button
              variant="transparent"
              className={cn(
                cName,
                'size-8 p-0 font-normal',
                modifiers?.today && 'bg-surface',
                modifiers?.selected &&
                  'bg-secondary text-white dark:text-secondary-900 hover:bg-secondary hover:text-white hover:dark:text-secondary-900 focus:bg-secondary focus:text-white focus:dark:text-secondary-900',
                modifiers?.outside && 'text-surface-400 opacity-50 pointer-events-none',
                modifiers?.disabled && 'opacity-50 text-surface-400',
                modifiers?.hidden && 'invisible',
                modifiers.range_start && 'day-range-start',
                modifiers.range_end && 'day-range-end',
                modifiers.range_middle &&
                  'bg-surface text-wg-black dark:text-white hover:bg-surface hover:text-wg-black hover:dark:text-white',
                modifiers.outside &&
                  modifiers.selected &&
                  'bg-surface-200/40 dark:bg-surface/10 text-surface-400'
              )}
              {...buttonProps}
              aria-selected={modifiers.selected || buttonProps['aria-selected']}
              aria-disabled={modifiers.disabled || buttonProps['aria-disabled']}
              aria-hidden={modifiers.hidden || buttonProps['aria-hidden']}
            />
          )
        },
        Chevron({ orientation, disabled, className: cName }) {
          const Component =
            orientation === 'left'
              ? ChevronLeft
              : orientation === 'right'
                ? ChevronRight
                : orientation === 'up'
                  ? ChevronUp
                  : ChevronDown

          return <Component className={cn('size-4', cName)} aria-disabled={disabled} />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
