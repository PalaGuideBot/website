import React, { createContext, useContext, useState, useMemo } from 'react'

export interface ChartSeries {
  id: string
  name: string
  color: string
  visible?: boolean
}

interface ChartContainerContextType {
  series: ChartSeries[]
  visibleSeries: ChartSeries[]
  toggleSeries: (seriesId: string) => void
  toggleAll: (visible: boolean) => void
  setSeries: (series: ChartSeries[]) => void
}

const ChartContainerContext = createContext<ChartContainerContextType | undefined>(undefined)

interface ChartContainerProps {
  children: React.ReactNode
  initialSeries: ChartSeries[]
}

export function ChartContainer({ children, initialSeries }: ChartContainerProps) {
  const [series, setSeries] = useState<ChartSeries[]>(initialSeries)

  const visibleSeries = useMemo(() => series.filter((s) => s.visible !== false), [series])

  const toggleSeries = (seriesId: string) => {
    setSeries((prev) =>
      prev.map((s) => (s.id === seriesId ? { ...s, visible: s.visible === false } : s))
    )
  }

  const toggleAll = (visible: boolean) => {
    setSeries((prev) => prev.map((s) => ({ ...s, visible })))
  }

  const value = {
    series,
    visibleSeries,
    toggleSeries,
    toggleAll,
    setSeries,
  }

  return <ChartContainerContext.Provider value={value}>{children}</ChartContainerContext.Provider>
}

export function useChart() {
  const context = useContext(ChartContainerContext)
  if (context === undefined) {
    throw new Error('useChart must be used within a ChartProvider')
  }
  return context
}
