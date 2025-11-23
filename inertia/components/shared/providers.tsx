import { QueryClientProvider } from '@tanstack/react-query'

import { getQueryClient } from '~/lib/query_client'
import { ThemeProvider } from '../theme_provider'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
    </QueryClientProvider>
  )
}
