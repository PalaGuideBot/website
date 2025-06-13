import { MoonIcon, SunIcon } from 'lucide-react'

import { useTheme } from '~/components/theme_provider'
import { Button } from '~/components/ui/button'

const ThemeToggler = (
  props: Omit<React.ComponentPropsWithoutRef<typeof Button>, 'onClick' | 'children'>
) => {
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

export default ThemeToggler
