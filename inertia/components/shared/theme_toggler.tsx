import { Button } from '@lemonsqueezy/wedges'
import { useTheme } from '~/components/theme_provider'
import { MoonIcon, SunIcon } from 'lucide-react'

const ThemeToggler = (
  props: Omit<React.ComponentPropsWithoutRef<typeof Button>, 'onClick' | 'children'>
) => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="transparent"
      isIconOnly
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      type="button"
      {...props}
    >
      <span className="sr-only">Toggle theme</span>
      {theme === 'light' ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
    </Button>
  )
}

export default ThemeToggler
