import { Button } from '@lemonsqueezy/wedges'
import { useTheme } from '~/components/theme_provider'
import { MoonIcon, SunIcon } from 'lucide-react'

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="transparent"
      isIconOnly
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
    </Button>
  )
}

export default ThemeToggler
