interface LinearGradientProps {
  id: string
  from: string
  to?: string
}

export function LinearGradient({ id, from, to = 'var(--background)' }: LinearGradientProps) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="20%" stopColor={from} stopOpacity={0.5} />
      <stop offset="80%" stopColor={to} stopOpacity={0.05} />
    </linearGradient>
  )
}
