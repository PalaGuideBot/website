import { type DateInput, type DateTimeFormatOptions, Interval } from 'luxon'

import { DateTime } from '~/lib/luxon'

export function formatDate(
  date: string | Date,
  format: DateTimeFormatOptions | string = DateTime.DATETIME_MED_WITH_SECONDS
) {
  const instance = date instanceof Date ? DateTime.fromJSDate(date) : DateTime.fromISO(date)

  if (typeof format === 'string') {
    return instance.toFormat(format)
  }

  return instance.toLocaleString(format)!
}

export function eachHourOfDate(date: string | Date) {
  const instance = date instanceof Date ? DateTime.fromJSDate(date) : DateTime.fromISO(date)

  return Interval.fromDateTimes(instance.startOf('day'), instance.endOf('day'))
    .splitBy({ hours: 1 })
    .map((interval) => interval.start!.toISO())
}

export function eachDayOfInterval({ start, end }: { start: DateInput; end: DateInput }) {
  return Interval.fromDateTimes(start, end)
    .splitBy({ days: 1 })
    .map((i) => i.start!.toISO())
}

export function formatDistance(from: DateInput, to: DateInput) {
  return Interval.fromDateTimes(from, to).toDuration().toFormat('hh:mm:ss')
}

export function translateWeekday(weekday: string) {
  weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1).toLowerCase()
  return DateTime.fromFormat(weekday, 'cccc', { locale: 'en' }).toFormat('cccc', { locale: 'fr' })
}
