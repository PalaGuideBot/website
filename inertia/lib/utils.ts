import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number, options?: Intl.NumberFormatOptions) {
  options = {
    notation: 'compact',
    compactDisplay: 'short',
    ...options,
  }
  return new Intl.NumberFormat('fr-FR', options).format(value)
}

export function formatDuration(value: number) {
  const days = Math.floor(value / 1440)
  const hours = Math.floor((value % 1440) / 60)
  const minutes = Math.round(value % 60)
  return `${days ? days + 'j ' : ''}${hours ? hours + 'h ' : ''}${minutes ? minutes + 'm' : ''}`
}
