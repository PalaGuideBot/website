import {
  eachHourOfInterval,
  endOfDay,
  format as f,
  formatDistanceStrict,
  startOfDay,
} from 'date-fns'
import { fr } from 'date-fns/locale'

export function formatDate(date: string | Date, format: string = 'PPpp') {
  return f(date, format, { locale: fr })
}

export function eachHourOfDate(date: string | Date) {
  return eachHourOfInterval({
    start: startOfDay(date),
    end: endOfDay(date),
  })
}

export function formatDistance(...args: Parameters<typeof formatDistanceStrict>) {
  let [date, baseDate, options] = args
  return formatDistanceStrict(date, baseDate, { locale: fr, ...options })
}
