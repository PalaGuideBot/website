import type { userRolesValidator } from '#staff/validators/user_validator'
import { type Infer } from '@vinejs/vine/types'
import * as React from 'react'

type PageSettingsContextValue = {
  roles: Infer<typeof userRolesValidator>
}

const PageSettingsContext = React.createContext<PageSettingsContextValue>(
  {} as PageSettingsContextValue
)

const PageSettings = PageSettingsContext.Provider

const usePageSettings = () => {
  const context = React.useContext(PageSettingsContext)

  if (!context) {
    throw new Error('usePageSettings should be used within <PageSettings>')
  }

  return context
}

export { PageSettings, usePageSettings }
