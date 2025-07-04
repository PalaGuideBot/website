import { MoonIcon, SunIcon } from 'lucide-react'

import { useTheme } from '~/components/theme_provider'
import { Button } from '~/components/ui/button'

export function ThemeToggler(
  props: Omit<React.ComponentProps<typeof Button>, 'onClick' | 'children'>
) {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      type="button"
      aria-label="Toggle theme"
      {...props}
    >
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
