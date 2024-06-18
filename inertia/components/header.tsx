import { Link, router } from '@inertiajs/react'
import { Avatar, DropdownMenu } from '@lemonsqueezy/wedges'
import { ChevronDownIcon, HomeIcon, LogOutIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useAuth } from '~/hooks/use_auth'
import { MobileNavigation } from './nav'
import ThemeToggler from './shared/theme_toggler'
import { useTheme } from './theme_provider'

const Header = () => {
  return (
    <header className="md:hidden min-h-14 w-full border-b flex gap-4 justify-between items-center px-4 bg-surface">
      <MobileNavigation />
      <Link href="/">
        <img src="/logo.png" className="h-6 lg:h-8 w-full object-contain" />
      </Link>
      <ThemeToggler size="sm" />
    </header>
  )
}

const StaffHeader = () => {
  const user = useAuth()
  const { theme, setTheme } = useTheme()
  return (
    <header className="min-h-14 w-full border-b px-4 bg-surface">
      <div className="max-w-4xl mx-auto flex gap-4 h-full justify-between items-center">
        <Link href="/">
          <img src="/logo.png" className="h-6 lg:h-8 w-full object-contain" />
        </Link>
        <div className="flex gap-2 items-center justify-center">
          {user && (
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <span className="group flex shrink cursor-pointer select-none items-center justify-center gap-1 rounded-lg p-1.5 px-2 text-sm text-surface-600 transition-colors duration-100 wg-antialiased hover:bg-surface dark:hover:bg-white/5">
                  <Avatar size="xs" src={user.avatarUrl} />
                  <span className="ms-2 flex flex-col">
                    <span className="font-medium">{user.globalName}</span>
                  </span>
                  <ChevronDownIcon className="trigger-icon h-5 w-5 text-surface-400" />
                </span>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end" className="min-w-[140px]">
                <DropdownMenu.Label className="normal-case text-normal font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-md font-bold leading-none">{user.nickName}</p>
                    <p className="text-xs font-light">{user.email}</p>
                  </div>
                </DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Group>
                  <DropdownMenu.Item asChild>
                    <Link href="/">
                      <HomeIcon className="size-4" />
                      <span>Retour à l'accueil</span>
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                    {theme === 'light' ? (
                      <SunIcon className="size-4" />
                    ) : (
                      <MoonIcon className="size-4" />
                    )}
                    <span>Thème: {theme === 'light' ? 'Clair' : 'Sombre'}</span>
                  </DropdownMenu.Item>
                </DropdownMenu.Group>
                <DropdownMenu.Separator />
                <DropdownMenu.Group>
                  <DropdownMenu.Item onClick={() => router.visit('/staff/logout')}>
                    <LogOutIcon className="size-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenu.Item>
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}

export { Header, StaffHeader }
