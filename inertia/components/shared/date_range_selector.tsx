import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@lemonsqueezy/wedges'
import { CalendarIcon } from 'lucide-react'
import { DateTime } from 'luxon'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

import { seasons } from '#core/content/paladium'
import type { DistanceFilter } from '#core/validators/filter_validator'
import { Calendar } from '~/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { useSearchParams } from '~/hooks/use_search_params'
import { formatDate } from '~/lib/date'
import { cn } from '~/lib/utils'

interface DateRangeSelectorProps {
  defaultOptions?: DistanceFilter | null
}

const DateRangeSelector = ({ defaultOptions }: DateRangeSelectorProps) => {
  const [searchParams, setSearchParams] = useSearchParams(defaultOptions || {})

  const [date, setDate] = useState<DateRange | undefined>(() => {
    const input = {
      from: DateTime.fromSQL(
        defaultOptions?.from ? defaultOptions.from : searchParams.get('from')!
      ),
      to: DateTime.fromSQL(defaultOptions?.to ? defaultOptions.to : searchParams.get('to')!),
    }
    if (input.from.isValid && input.to.isValid) {
      return {
        from: input.from.toJSDate(),
        to: input.to.toJSDate(),
      }
    }
  })

  const onSubmit = () => {
    if (!date) {
      return
    }
    setSearchParams({
      from: DateTime.fromJSDate(date.from!).toSQLDate()!,
      to: DateTime.fromJSDate(date.to!).toSQLDate()!,
    })
  }

  const onSelectChange = (value: string) => {
    const [from, to] = value.split(':')
    setSearchParams({ from, to })
  }

  const seasonOptions = seasons.map((season) => ({
    value: `${season.start.toSQLDate()}:${season.end.toSQLDate()}`,
    label: season.name,
  }))

  const defaultSeason = seasonOptions.find(
    (season) => season.value === `${defaultOptions?.from}:${defaultOptions?.to}`
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          before={<CalendarIcon className="size-4" />}
          className={cn(
            'w-[300px] justify-start text-left font-normal',
            !searchParams.has('from') && searchParams.has('to') && 'text-surface-400'
          )}
        >
          {defaultSeason && defaultSeason.label}
          {!defaultSeason && date?.from && date?.to && (
            <>
              {formatDate(date.from, DateTime.DATE_MED)} - {formatDate(date.to, DateTime.DATE_MED)}
            </>
          )}
          {!defaultSeason && !date?.from && !date?.to && <span>Choisir une date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 flex flex-col bg-background" align="end">
        <div className="p-2 pb-0">
          <Select defaultValue={defaultSeason?.value} onValueChange={onSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Version" />
              <SelectIcon />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {seasonOptions.map((season) => (
                  <SelectItem key={season.value} value={season.value}>
                    {season.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Calendar
          autoFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <div className="p-3 pt-0 flex justify-end">
          <Button onClick={onSubmit} size="sm" variant="tertiary">
            Valider
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { DateRangeSelector }
