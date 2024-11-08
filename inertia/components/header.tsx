import { Link } from '@inertiajs/react'
import { Button, DropdownMenu } from '@lemonsqueezy/wedges'
import { LogInIcon } from 'lucide-react'

import { useAuth } from '~/hooks/use_auth'
import ThemeToggler from './shared/theme_toggler'
import { UserDropdownContent, UserDropdownTrigger } from './shared/user_dropdown'
import { SidebarTrigger } from './ui/sidebar'

const Header = () => {
  const user = useAuth()

  return (
    <header className="md:hidden min-h-14 w-full border-b flex gap-4 justify-between items-center px-4 bg-background">
      <SidebarTrigger />
      {user ? (
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <span className="group flex shrink cursor-pointer select-none items-center justify-center gap-1 rounded-lg p-1.5 px-2 text-sm text-surface-600 transition-colors duration-100 wg-antialiased hover:bg-surface dark:hover:bg-white/5">
              <UserDropdownTrigger user={user} />
            </span>
          </DropdownMenu.Trigger>
          <UserDropdownContent user={user} />
        </DropdownMenu>
      ) : (
        <>
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-6 lg:h-8 w-full object-contain" />
          </Link>
          <div>
            <ThemeToggler size="sm" />
            <Button variant="transparent" size="sm" isIconOnly asChild>
              <Link href="/login">
                <LogInIcon className="size-4" />
              </Link>
            </Button>
          </div>
        </>
      )}
    </header>
  )
}

const StaffHeader = () => {
  const user = useAuth()

  return (
    <header className="min-h-14 w-full border-b px-4 bg-background z-10 sticky top-0">
      <div className="max-w-4xl mx-auto flex gap-4 h-full justify-between items-center">
        <Link href="/">
          <img src="/logo.png" className="h-6 lg:h-8 w-full object-contain" />
        </Link>
        <div className="flex gap-2 items-center justify-center">
          {user && (
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <span className="group flex shrink cursor-pointer select-none items-center justify-center gap-1 rounded-lg p-1.5 px-2 text-sm text-surface-600 transition-colors duration-100 wg-antialiased hover:bg-surface dark:hover:bg-white/5">
                  <UserDropdownTrigger user={user} />
                </span>
              </DropdownMenu.Trigger>
              <UserDropdownContent user={user} />
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}

export { Header, StaffHeader }
