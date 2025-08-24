import { Infer } from '@vinejs/vine/types'
import * as React from 'react'

import type { calculatorJobItemsValidator } from '#tools/validators/calculator_validator'
import { smallIcons } from '~/content/jobs'

type CalculatorMode = 'standard' | 'reverse'

type JobCalculatorWrapperContextValue = {
  mode: CalculatorMode
  setMode: (mode: CalculatorMode) => void
  items: Infer<typeof calculatorJobItemsValidator>
  jobs: typeof jobs
}

const jobs = [
  {
    label: 'Miner',
    value: 'miner',
    icon: smallIcons.miner,
  },

  {
    label: 'Farmer',
    value: 'farmer',
    icon: smallIcons.farmer,
  },
  {
    label: 'Hunter',
    value: 'hunter',
    icon: smallIcons.hunter,
  },
  {
    label: 'Alchimiste',
    value: 'alchemist',
    icon: smallIcons.alchemist,
  },
]

const JobCalculatorWrapperContext = React.createContext<JobCalculatorWrapperContextValue>(
  {} as JobCalculatorWrapperContextValue
)

function JobCalculatorWrapper({
  children,
  mode: defaultMode = 'standard',
  items,
}: {
  children: React.ReactNode
  mode?: CalculatorMode
  items: JobCalculatorWrapperContextValue['items']
}) {
  const [mode, setMode] = React.useState<CalculatorMode>(defaultMode)

  return (
    <JobCalculatorWrapperContext.Provider value={{ items, mode, setMode, jobs }}>
      {children}
    </JobCalculatorWrapperContext.Provider>
  )
}

function useJobCalculator() {
  const context = React.useContext(JobCalculatorWrapperContext)

  if (!context) {
    throw new Error('useJobCalculator should be used within <JobCalculatorWrapper>')
  }

  return context
}

export { JobCalculatorWrapper, useJobCalculator }
