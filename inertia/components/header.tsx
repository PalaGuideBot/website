import { Link } from '@inertiajs/react'
import { LogInIcon } from 'lucide-react'

import { ThemeToggler } from '~/components/shared/theme_toggler'
import { UserDropdownContent, UserDropdownTrigger } from '~/components/shared/user_dropdown'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger } from '~/components/ui/dropdown_menu'
import { SidebarTrigger } from '~/components/ui/sidebar'
import { useAuth } from '~/hooks/use_auth'

export function Header() {
  const user = useAuth()

  return (
    <header className="md:hidden min-h-14 w-full border-b flex gap-4 justify-between items-center px-4 bg-background">
      <SidebarTrigger />
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="group flex shrink cursor-pointer select-none items-center justify-center gap-1 rounded-lg p-1.5 px-2 text-sm transition-colors duration-100 antialiased hover:bg-carddark:hover:bg-white/5">
              <UserDropdownTrigger user={user} />
            </span>
          </DropdownMenuTrigger>
          <UserDropdownContent user={user} />
        </DropdownMenu>
      ) : (
        <>
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-6 lg:h-8 w-full object-contain" />
          </Link>
          <div>
            <ThemeToggler size="sm" />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <LogInIcon />
              </Link>
            </Button>
          </div>
        </>
      )}
    </header>
  )
}

export function StaffHeader() {
  const user = useAuth()

  return (
    <header className="min-h-14 w-full border-b bg-background z-10 sticky top-0">
      <div className="max-w-6xl mx-auto px-4 flex gap-4 h-full justify-between items-center">
        <Link href="/">
          <img src="/logo.png" className="h-6 lg:h-8 w-full object-contain" />
        </Link>
        <div className="flex gap-2 items-center justify-center">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="group flex shrink cursor-pointer select-none items-center justify-center gap-1 rounded-lg p-1.5 px-2 text-sm transition-colors duration-100 antialiased hover:bg-carddark:hover:bg-white/5">
                  <UserDropdownTrigger user={user} />
                </span>
              </DropdownMenuTrigger>
              <UserDropdownContent user={user} />
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
