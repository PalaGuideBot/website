import { fr } from 'date-fns/locale'
import { format as f, startOfDay, endOfDay, eachHourOfInterval } from 'date-fns'

export function formatDate(date: string | Date, format: string = 'PPpp') {
  return f(date, format, { locale: fr })
}

export function eachHourOfDate(date: string | Date) {
  return eachHourOfInterval({
    start: startOfDay(date),
    end: endOfDay(date),
  })
}
