import { Link } from '@inertiajs/react'
import { Button } from '@lemonsqueezy/wedges'
import { LogInIcon } from 'lucide-react'
import { useAuth } from '~/hooks/use_auth'
import { MobileNavigation } from './nav'
import ThemeToggler from './shared/theme_toggler'
import { UserDropdown } from './shared/user_dropdown'

const Header = () => {
  const user = useAuth()

  return (
    <header className="md:hidden min-h-14 w-full border-b flex gap-4 justify-between items-center px-4 bg-background">
      <MobileNavigation />
      {user ? (
        <UserDropdown user={user} />
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
    <header className="min-h-14 w-full border-b px-4 bg-background">
      <div className="max-w-4xl mx-auto flex gap-4 h-full justify-between items-center">
        <Link href="/">
          <img src="/logo.png" className="h-6 lg:h-8 w-full object-contain" />
        </Link>
        <div className="flex gap-2 items-center justify-center">
          {user && <UserDropdown user={user} />}
        </div>
      </div>
    </header>
  )
}

export { Header, StaffHeader }
